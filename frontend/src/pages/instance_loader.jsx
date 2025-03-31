import axios from 'axios';
import Instances from "./instances.jsx";

// Create a simple data store
const InstanceLoader = {
  isLoaded: false,

  // Method to initialize the data
  initialize: function () {
    if (!this.isLoaded) {
      try {
        // Fetch data for the first page (page 1)
        const job_response_page1 = axios.get('https://api.speakatx.me/get/jobs?page=1&per_page=100', {
          timeout: 1000, // 10 seconds timeout
        });
        const service_response_page1 = axios.get('https://api.speakatx.me/get/translations?page=1&per_page=100', {
          timeout: 1000, // 10 seconds timeout
        });
        const comm_response_page1 = axios.get('https://api.speakatx.me/get/communities?page=1&per_page=100', {
          timeout: 1000, // 10 seconds timeout
        });

        // Fetch data for the second page (page 2)
        const job_response_page2 = axios.get('https://api.speakatx.me/get/jobs?page=2&per_page=100', {
          timeout: 1000, // 10 seconds timeout
        });
        const service_response_page2 = axios.get('https://api.speakatx.me/get/translations?page=2&per_page=100', {
          timeout: 1000, // 10 seconds timeout
        });
        const comm_response_page2 = axios.get('https://api.speakatx.me/get/communities?page=2&per_page=100', {
          timeout: 1000, // 10 seconds timeout
        });

        // Wait for all the requests to complete (using Promise.all)
        Promise.all([job_response_page1, job_response_page2, service_response_page1, service_response_page2, comm_response_page1, comm_response_page2])
          .then((responses) => {
            const job_response = responses[0].data.items.concat(responses[1].data.items);
            const service_response = responses[2].data.items.concat(responses[3].data.items);
            const comm_response = responses[4].data.items.concat(responses[5].data.items);

            this.isLoaded = true;

            // Store the data in the Instances object
            Instances.jobs = job_response;
            Instances.translations = service_response;
            Instances.communities = comm_response;

            for (var i = 0; i < Instances.jobs.length; i++) {
              Instances.jobs[i].originalName = Instances.jobs[i].name;
            }
            for (var i = 0; i < Instances.translations.length; i++) {
              Instances.translations[i].originalName = Instances.translations[i].name;
            }
            for (var i = 0; i < Instances.communities.length; i++) {
              Instances.communities[i].originalName = Instances.communities[i].name;
            }

            // Store the original data
            Instances.origJobs = Instances.jobs.slice();
            Instances.origTranslations = Instances.translations.slice();
            Instances.origCommunities = Instances.communities.slice();

            Instances.loaded = true;

            console.log('Data loaded in background');
          })
          .catch((error) => {
            console.error('Error loading data:', error);
          });
      } catch (error) {
        console.error('Error loading data:', error);
      }
    }
  },
};

// Initialize immediately when this module is imported
InstanceLoader.initialize();

export default InstanceLoader;
