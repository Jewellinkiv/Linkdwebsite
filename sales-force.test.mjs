import test from 'node:test';
import assert from 'node:assert/strict';
import {createHmac} from 'node:crypto';
import {deliverIntake,normalizeIntake,withSalesForce} from './integrations/sales-force.mjs';
const env={SALES_FORCE_ENABLED:'true',SALES_FORCE_SIGNING_KEY:'a-test-only-secret-with-32-characters'};
test('signs an allowlisted payload and retries with one submission ID',async()=>{
 const payload=normalizeIntake({submissionId:'same-id',name:'Test Person',email:'test@example.test',storeName:'Test Store',password:'secret',turnstileToken:'secret'},{brand:'linkd',form:'Test inquiry'});
 let calls=0;
 await deliverIntake(env,'linkd',payload,async(url,options)=>{
  calls++;assert.equal(url,'https://sales.linkd.com/api/webhooks/websites/linkd');
  const [t,v]=options.headers['X-Linkd-Signature'].split(',');
  assert.equal(v.slice(3),createHmac('sha256',env.SALES_FORCE_SIGNING_KEY).update(t.slice(2)+'.'+options.body).digest('hex'));
  assert.equal(JSON.parse(options.body).submissionId,'same-id');assert.doesNotMatch(options.body,/password|turnstile/);
  return new Response('{}',{status:calls===1?503:200});
 });assert.equal(calls,2);
});
test('no forwarding when disabled, invalid, or honeypot; failure is not reported as success',async()=>{
 let calls=0;await deliverIntake({},'linkd',{},async()=>{calls++;throw Error()});assert.equal(calls,0);
 const wrap=withSalesForce(async()=>Response.json({ok:true}),{brand:'linkd',form:'Test',getEnv:async()=>({SALES_FORCE_ENABLED:'true'})});
 const req=data=>new Request('https://linkd.com/api/demo',{method:'POST',body:JSON.stringify(data)});
 assert.equal((await wrap(req({name:'Test',email:'test@example.test',website:'bot'}))).status,200);
 assert.equal((await wrap(req({name:'Test',email:'test@example.test'}))).status,503);
});
