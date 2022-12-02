<template>
  <div id='task-list'>
    <v-list-item-group>

      <!-- TODO: Add a v-for attribute on this tag -->
      <!-- Remember to use the :key attribute to define a key for each task! -->
      <v-list-item v-for="task in tasks" :key="task._id">

        <template>
          <v-list-item-action>

            <!-- TODO: Add a click event handler attribute here that updates a task -->
            <v-btn v-on:click="updateTask(task)" icon> 

              <!-- TODO: Add a v-if and v-else check here based on the current task's Done property -->
              <!-- Does this check the done status by default or do I need to clarify it needs DONE? -->
              <v-icon v-if="true">check_box</v-icon>
              <v-icon v-else>check_box_outline_blank</v-icon>

            </v-btn>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>

              <!-- TODO: Show the value of the task's Text property here -->
              {{ task.Text }}
            </v-list-item-title>
            <v-list-item-subtitle>

              <!-- TODO: Show the value of the task's Date property here -->
              {{ task.Date }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>

            <!-- TODO: Add a click event handler attribute here that deletes this task -->
            <v-btn v-on:click="deleteTask(task)" icon> 
              <v-icon color="red">delete</v-icon>
            </v-btn>
          </v-list-item-action>
        </template>
      </v-list-item>
    </v-list-item-group>
  </div>
</template>

<script>
export default {
  name: 'TaskList',
  props: {
    // TODO: Figure out what you need to bring in from props, then and then add those variables here
    // Make sure to include these props on the component's tag when using it in another file
    // HINT: For the tasks prop, set the default value to:
    // default: () => []
    tasks: {
      default: () => []
    },
    updateTask: {
      Type: Function
    },
    deleteTask: {
      Type: Function
    }
  }
}
</script>