const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function testStudyGroups() {
  console.log('🧪 Testing Study Groups API...\n');

  try {
    // Test 1: Get all groups
    console.log('Test 1: GET /api/study-groups');
    const groupsResponse = await axios.get(`${API_URL}/study-groups`);
    console.log('✅ Success! Found', groupsResponse.data.length, 'groups\n');

    // Test 2: Check if route exists
    console.log('Test 2: Checking route configuration');
    const healthResponse = await axios.get(`${API_URL}/health`);
    console.log('✅ Server is running:', healthResponse.data.status, '\n');

    console.log('All tests passed! ✅');
    console.log('\nTo create a group, you need:');
    console.log('1. Valid JWT token (login first)');
    console.log('2. Fill all required fields');
    console.log('3. Select a category');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
  }
}

testStudyGroups();
