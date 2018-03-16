<template>
  <md-layout md-gutter md-flex md-column>

  
      <md-card>
        <md-card-header>
          <md-card-header-text>
            <div class="md-title">Vue.js Dahboard</div>
            <div class="md-subhead">Exploring the capabilites of Vue with material design</div>
          </md-card-header-text>
        </md-card-header>
        <md-card-content>
          <div>
            This dashboard built for comparing and understanding latest ui framework.
          </div>
          <div>
            <h4>Features</h4>
            <ui>
              <li>Realtime charting (Websocket enabled)</li>
              <li>CRUD operations using Vuex</li>
              <li>Jwt authorization </li>
              <li>File upload </li>
              <li>Role based access</li>
              <li>Vue.js Lifecycle </li>
            </ui>
          </div>
          <div>
            <h4>Backend</h4>
            The backend for the dashboard is at <a href="https://github.com/rupeshpadhye/dashboard-server" target="_blank" rel="noopener">Backend github</a> 
          </div>  
        </md-card-content>
      </md-card>
   

    <md-card style="margin-top:1rem;">
      <md-card-header>
        <md-card-header-text>
           <div class="md-title">About Author</div>
        </md-card-header-text>
      </md-card-header>
      <md-card-content>
        <md-layout md-gutter>
          <md-layout md-align="center" md-flex="40">
            <img alt="" src="https://avatars2.githubusercontent.com/u/10848048?s=300&amp;v=4" width="300" />
          </md-layout>
          <md-layout md-flex="60" md-column>
            <h2 class="md-title">Rupesh Padhye</h2>
            <div>Hello , I have been working on across technlogy stack.</div>
            <div>
              <h4>Technical skills</h4>
              <ui>
                <li>UI Technologies - Javascript , Angular 1.x ,Polymer Js ,Vue.js </li>
                <li>Backend Technologies - Java, Spring ,Spring boot</li>
                <li>Mobile Technologies - Android , Hybrid App -ionic 1.x ,</li>
              </ui>
            </div>
            <div>
              <h4>Contacts</h4>
              <a href="https://github.com/rupeshpadhye" target="_blank" rel="noopener">GitHub</a>
              <a href="https://www.linkedin.com/in/rupesh-padhye-16301417/" target="_blank" rel="noopener">Linkedin</a>
            </div>
          </md-layout>
        </md-layout>
      </md-card-content>
    </md-card>

    
  </md-layout>
</template>

<script>
export default {
  name: 'About',
};
</script>
<style scoped>
img {
  border-radius: 50%;
}
</style>
