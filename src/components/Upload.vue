<template>
    <v-card class="mx-auto" max-width="600">
        <v-card-actions>
            <v-file-input
                label="Upload File"
                density="compact"
                show-size
                @change="onFileChange"
            ></v-file-input>
        </v-card-actions>
    </v-card>
</template>

<script setup>
import { arrayBufferToGeoJSON } from '@/lib/misc';
import { useMapStore } from '@/stores/mapStore';
const mapStore = useMapStore();

const onFileChange = (event) => {
    const newFile = event.target.files[0];
    console.log(newFile);

    if (newFile && newFile instanceof File) {
        // Create a FileReader instance
        const reader = new FileReader();

        // Define the onload event handler for the FileReader
        reader.onload = (event) => {
            // File content can be accessed via event.target.result
            const fileContent = event.target.result;
            console.log(fileContent);
            const geojson = arrayBufferToGeoJSON(fileContent);
            console.log(geojson);
            mapStore.updateShp(geojson);
        };

        // Define the onerror event handler for the FileReader
        reader.onerror = (error) => {
            console.error('Error reading file:', error);
        };

        // Determine the file type and use the appropriate FileReader method
        if (newFile.type.includes('text')) {
            console.log('is text');
            reader.readAsText(newFile); // Read the file as text
        } else if (newFile.type.includes('json')) {
            reader.readAsText(newFile); // Read JSON files as text
        } else if (newFile.type.includes('image')) {
            reader.readAsDataURL(newFile); // Read image files as Data URL
        } else {
            reader.readAsArrayBuffer(newFile); // Read other file types as ArrayBuffer
        }
    } else {
        // fileContent.value = 'No file selected';
        console.log('no file');
    }
};
</script>
