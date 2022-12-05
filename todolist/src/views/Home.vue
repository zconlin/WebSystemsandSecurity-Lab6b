<template>
<!-- My Questions: NTF event handler, double check the bindings in NTF, double check props in NTF -->
<!-- Reset this.form() to initial values -->
  <div class="home">
    <v-card class="mx-auto" max-width="900" v-if="fetched">

      <!-- TODO: Add your NewTaskForm component -->
      <!-- Make sure to pass in any necessary props -->
          <NewTaskForm :form="form" :createTask="createTask"></NewTaskForm>

<!-- 
      <v-divider></v-divider> -->
      <v-list subheader two-line flat>
        <v-subheader>

          <!-- TODO: use the `user` prop to display the user's username here -->
          {{user.UserName}}'s Tasks:

        </v-subheader>

        <!-- TODO: Add your TaskList component -->
        <!-- Make sure to pass in any necessary props -->
        <TaskList :tasks="tasks" :deleteTask="deleteTask" :updateTask="updateTask"></TaskList>


      </v-list>
    </v-card>
  </div>
</template>

<script>
import { getCurrentDate, formatDate } from '@/util'
import TaskList from "@/components/TaskList.vue"
import NewTaskForm from "@/components/NewTaskForm.vue"

// TODO: Import the components you want to use from their files
export default {
  name: 'Home',
  components: {
    // TODO: Use the Vue Documentation to find out how to use this property
    TaskList,
    NewTaskForm 
  },
  props: {
    // TODO: Add the user object as a prop that's passed in from the App.vue component
    user: {
        Type: Object,
        Default: {
          Type: Object,
          Username: ""
        }
    }
  },
  data: () => ({
    fetched: false, // This keeps us from getting an error when the page loads, but there's no data
    tasks: [], // This will hold the list of tasks you get from your API
    form: {
      // TODO: Add 2 properties to this form data object to track the Text and the Date
      // HINT: Capitalize the "Text" and "Date" properties to make it easier to pass the data to your API
      // HINT: You can use the `getCurrentDate()` method to get today's date in the proper format for the date picker
      Text:"",
      Date:getCurrentDate()
    },
  }),
  mounted() {
    // TODO: Call the method that gets the tasks from your API
    this.readTasks()
  },
  methods: {
    createTask(form) {
      // TODO: Use fetch() to send a POST request to your API that includes the data from this.form
      fetch(
       `${process.env.VUE_APP_API_ORIGIN}/api/v1/tasks/`,
      // TODO: Remember to get the updated task list when it's done
      {
          method: `POST`,
          credentials: `include`,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ Text: this.form.Text, Date: this.form.Date})
        }
        ).then(response => {
        // Here we're just checking if the response was successful or not before
        // trying to do anything about it.
        if (response.ok) {
          // If it is successful, we want to update the task list.
          this.readTasks()
        }
      })
      // TODO: Remember to reset the values in this.form to their initial values when it's done
      this.form.Text= ""
      this.form.Date= getCurrentDate()
    },
    readTasks() {
      // TODO: Use fetch() to send a GET request to your API and update this.fetched and this.tasks with the data that's returned
      fetch(
        `${process.env.VUE_APP_API_ORIGIN}/api/v1/tasks`,
        {
          method: `GET`,
          credentials: `include`,
        }
        // Note: The default for method is GET, so you don't need to include the
        // method on any GET requests.
      ).then(response => {
        if (response.ok) {
          return response.json()
        }
      }).then(response => {
        this.fetched = true
        this.tasks = response
      })
    },
    updateTask(task) { 
      fetch(
        // The first parameter is a string that contains the full URL to your endpoint
        `${process.env.VUE_APP_API_ORIGIN}/api/v1/tasks/${task._id}`,
  
        {
          method: `PUT`,
          credentials: `include`,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ Done: !task.Done})

        }
      ).then(response => {
        if (response.ok) {
          return response.json()
        }
      })
      .then(response => {
      this.readTasks()
      })
    },
    // This method is given to you. Use it to see how to make fetch() requests.
    deleteTask(task) {
      fetch(
        // The first parameter is a string that contains the full URL to your endpoint
        `${process.env.VUE_APP_API_ORIGIN}/api/v1/tasks/${task._id}`,
        // The second parameter is an object with options. You can include request
        // headers here, options for credentials, which method, which mode, etc.
        {
          method: `DELETE`,
          credentials: `include`,
        }
        // Note: The default for method is GET, so you don't need to include the
        // method on any GET requests.
      ).then(response => {
        // Here we're just checking if the response was successful or not before
        // trying to do anything about it.
        if (response.ok) {
          // If it is successful, we want to update the task list.
          this.readTasks()
        }
      })
    }
  }
}
</script>

<style scoped>
.form {
  padding: 0 1rem;
}
</style>

