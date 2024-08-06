<template>
    <v-card class="mx-auto" max-width="600">
        <v-card-actions>
          <v-file-input
            label="Upload File"
            show-size
            @change="onFileChange"
          ></v-file-input>
        </v-card-actions>
    </v-card>
</template>

<script setup>

const onFileChange = (newFile) => {
  if (newFile) {
    // Handle the file data as needed
    console.log('Selected file:', newFile)
  }
}

</script>
