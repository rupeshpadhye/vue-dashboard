
</<template>
  <div>
      <md-layout>
  
      <md-tabs md-fixed>
            <md-tab id="register" md-label="Add New User">
               <register-user></register-user>
            </md-tab>
             <md-tab id="view" md-label="View & Modify Users">
                 <view-modify-users></view-modify-users>
            </md-tab>
            </md-tabs>
    </md-layout>
  </div>    
</template>
<script>
import registerUser from '@/components/user_management/RegisterUser';
import ViewModifyUsers from '@/components/user_management/ViewModifyUsers';

export default {
  name: 'UserManagement',
  components: { registerUser, ViewModifyUsers },
  data() {
    return {
      register: false,
    };
  },
  methods: {},
};
</script>
<style scoped>
  
</style>

