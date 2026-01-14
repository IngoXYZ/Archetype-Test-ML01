// Standalone Script to Create MailerLite Custom Fields
// Run this ONCE to create all required custom fields in your MailerLite account

const MAILERLITE_API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiOGU4OWRjNmQxYmM3MzNkNzU4Y2UwNDkxYzRiMDZlYzMzZGI3NDgyOTlkOTVhMzQ1MDhlOTJhZDlkNDA2OWVkZjI5YTgxNjM3YjkxYTUyNmUiLCJpYXQiOjE3NjgzMzE0MzAuNzE3NjQ2LCJuYmYiOjE3NjgzMzE0MzAuNzE3NjQ5LCJleHAiOjQ5MjQwMDUwMzAuNzA0MDY1LCJzdWIiOiIyMDM0NTEyIiwic2NvcGVzIjpbXX0.WsZPCHSNc9sIbrZKR4ka5VgcpDdW08xCc8AWdcPd9oDMRvsjAvKuSsdg_FEL5q1haJV1toDczF6nfAR8rFQ9KSG8Trdatuy03n7oaqXzitZFKz7aeFD_3_rYLJz0WqPuoK6mqLwTv6wAB-t1z2Wy8e3KC-L_N1nlYuzhneFI5a4jxhc8ayUwxThbuxJvMd5sNipQWi4-OVeqbAF6dLgXF32Q33SvRn_dzw0Jy76871clSMGpMvzZ60fXMXLByhviyorE7dIP71dD1yFLDWyN8m3ED07r7ncnX__1PWuLxGs0qzC24W9FlCOIJJlQ_c0Lso_q2lFIAnPCK6I81uL16VpxGE3y0O-P21_c1Azj0Lwj-lSdmk0V1mhBy_YufJDkzEYHnXiIcoQdLvUfK1nUbFz9gg10MEVCPa0bXqRAmTYiNzwri2rQUF11JEBTQX_AWFEJgo-ikkHcC3ln81bvnSxwZrq3XEd2xIUDGOKD-qr2IBl866VSCDpGCfTuDKWd6-f36oNrdGa_mTfIKPbla31-ErUY4pdYSEAeVCZmhrXB-TzXOB8z0aQY9XR5S-2YH9C7c_4SJbErJLtGlPnd6hjUtqT42I1qY9SW4X59jgNtBo-MSAHC7-lVu5dAUm6Lnyz95UYjXR-lyJyg7oX9LgFi7ypmwNeG1wA-gX1Yau0';

const REQUIRED_FIELDS = [
  { name: 'Archetype', type: 'text' },
  { name: 'Archetype Percent', type: 'number' },
  { name: 'Test Date', type: 'text' },
  { name: 'Archetype 1', type: 'text' },
  { name: 'Archetype 1 Percent', type: 'number' },
  { name: 'Archetype 2', type: 'text' },
  { name: 'Archetype 2 Percent', type: 'number' },
  { name: 'Archetype 3', type: 'text' },
  { name: 'Archetype 3 Percent', type: 'number' }
];

async function createFields() {
  console.log('🚀 Starting MailerLite Custom Fields Creation...');
  console.log('=' .repeat(60));
  
  try {
    // Step 1: Get existing fields
    console.log('\n📋 Step 1: Fetching existing fields...');
    const fieldsResponse = await fetch('https://connect.mailerlite.com/api/fields', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${MAILERLITE_API_KEY}`
      }
    });
    
    if (!fieldsResponse.ok) {
      const errorText = await fieldsResponse.text();
      console.error('❌ Failed to fetch fields. Status:', fieldsResponse.status);
      console.error('Error:', errorText);
      return;
    }
    
    const fieldsResult = await fieldsResponse.json();
    const existingFields = fieldsResult.data || [];
    const existingFieldKeys = existingFields.map(f => f.key);
    
    console.log('✅ Found', existingFields.length, 'existing fields:');
    existingFields.forEach(f => console.log('   -', f.name, `(${f.key})`, '-', f.type));
    
    // Step 2: Create missing fields
    console.log('\n🔧 Step 2: Creating missing fields...');
    let createdCount = 0;
    let skippedCount = 0;
    let failedCount = 0;
    
    for (const field of REQUIRED_FIELDS) {
      // Convert name to key format (lowercase, underscores)
      const fieldKey = field.name.toLowerCase().replace(/ /g, '_');
      
      if (existingFieldKeys.includes(fieldKey)) {
        console.log(`⏭️  Skipping "${field.name}" - already exists`);
        skippedCount++;
        continue;
      }
      
      console.log(`\n➕ Creating field: "${field.name}" (${field.type})...`);
      
      const createResponse = await fetch('https://connect.mailerlite.com/api/fields', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${MAILERLITE_API_KEY}`
        },
        body: JSON.stringify({
          name: field.name,
          type: field.type
        })
      });
      
      if (createResponse.ok) {
        const result = await createResponse.json();
        console.log(`   ✅ Created successfully!`);
        console.log(`   📌 Field Key: ${result.data.key}`);
        createdCount++;
      } else {
        const error = await createResponse.json();
        console.error(`   ❌ Failed to create field:`);
        console.error(`   Status: ${createResponse.status}`);
        console.error(`   Error:`, JSON.stringify(error, null, 2));
        failedCount++;
      }
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 SUMMARY:');
    console.log('   ✅ Created:', createdCount);
    console.log('   ⏭️  Skipped (already exist):', skippedCount);
    console.log('   ❌ Failed:', failedCount);
    
    if (createdCount + skippedCount === REQUIRED_FIELDS.length) {
      console.log('\n🎉 SUCCESS! All custom fields are ready in MailerLite!');
      console.log('\n📧 You can now use these fields in your email templates:');
      REQUIRED_FIELDS.forEach(f => {
        const key = f.name.toLowerCase().replace(/ /g, '_');
        console.log(`   {$${key}} - ${f.name}`);
      });
    } else {
      console.log('\n⚠️  Some fields could not be created. Please check the errors above.');
    }
    
  } catch (error) {
    console.error('\n❌ Unexpected error:', error.message);
    console.error(error.stack);
  }
}

// Run the script
createFields();
