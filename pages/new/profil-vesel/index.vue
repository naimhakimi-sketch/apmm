<template>
    <div class="p-6">
       

        <!-- Analytics Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <!-- Jumlah Kapal -->
            <div class="bg-white rounded-lg shadow p-6">
                <div class="flex items-center justify-between">
                <div>
                    <p class="text-sm text-gray-500">Jumlah Kapal</p>
                    <h3 class="text-2xl font-bold">3</h3>
                </div>
                <div class="p-3 bg-primary-50 rounded-full">
                    <Icon class="text-primary-600" name="fluent:vehicle-ship-20-filled"></Icon>
                </div>
                </div>
            </div>

            <!-- Jumlah Bot -->
            <div class="bg-white rounded-lg shadow p-6">
                <div class="flex items-center justify-between">
                <div>
                    <p class="text-sm text-gray-500">Jumlah Bot</p>
                    <h3 class="text-2xl font-bold">7</h3>
                </div>
                <div class="p-3 bg-warning-50 rounded-full">
                    <Icon class="text-warning-700" name="fluent:vehicle-ship-20-filled"></Icon>
                </div>
                </div>
            </div>

            <!-- Kapal OPS -->
            <div class="bg-white rounded-lg shadow p-6">
                <div class="flex items-center justify-between">
                <div>
                    <p class="text-sm text-gray-500">OPS</p>
                    <h3 class="text-2xl font-bold"> Kapal 0 | Bot 0 </h3>
                </div>
                <div class="p-3 bg-success-50 rounded-full">
                    <Icon class="text-success-700" name="fluent:vehicle-ship-20-filled"></Icon>
                </div>
                </div>
            </div>

            <!-- Kapal Non OPS -->
            <div class="bg-white rounded-lg shadow p-6">
                <div class="flex items-center justify-between">
                <div>
                    <p class="text-sm text-gray-500">Non OPS</p>
                    <h3 class="text-2xl font-bold"> Kapal 3 | Bot 7</h3>
                </div>
                <div class="p-3 bg-danger-50 rounded-full">
                    <Icon class="text-danger-700" name="fluent:vehicle-ship-20-filled"></Icon>
                </div>
                </div>
            </div>

            

        </div>

         <!-- Page Header -->
        <div class="mb-6">
            <h1 class="text-2xl font-bold">Senarai Kapal / Bot</h1>
            <p class="text-gray-600">Dikemaskini sehingga 27/05/2025</p>
        </div>

        <!-- Table Section -->
        <div class="bg-white rounded-lg shadow p-6">
            <rs-table
                :data="tableData"
                :field="['bil', 'maritimNegeri/ZonMaritim', 'kapal/Bot', 'jenisAset', 'kategoriAset', 'tindakan']"
                :options="{
                    variant: 'default',
                    striped: true,
                    borderless: true,
                    hover: true
                }"
                :options-advanced="{
                    sortable: true,
                    responsive: true,
                    filterable: true
                }"
                advanced
            >
                <template v-slot:categoriAset="row">
                    <span :class="{
                        'px-2 py-1 rounded-full text-xs': true,
                        'bg-success-50 text-success-700': row.text  === 'OPS',
                        'bg-danger-50 text-danger-700': row.text === 'Non OPS'
                    }">
                        {{ row.text }}
                    </span>
                </template>
                
                <template v-slot:tindakan="row">
                    <div class="flex gap-2">
                        <button @click="$router.push(`/new/lihatVesel/${row.text}`)" class="text-primary-600 hover:text-primary-800">
                            <Icon class="text-primary" name="weui:eyes-on-outlined"></Icon>
                        </button>
                    </div>
                </template>
            </rs-table>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const tableData = ref([
    {
        bil: 1,
        lokasi: 'MARITIM NEGERI KEDAH / PERLIS',
        namaVesel: 'KM SIANGIN',
        jenisVesel: 'Kapal',
        categoriAset: 'Non OPS',
        id: '1'
    },
    {
        bil: 2,
        lokasi: 'MARITIM NEGERI KEDAH / PERLIS',
        namaVesel: 'KM TENGGOL',
        jenisVesel: 'Kapal',
        categoriAset: 'Non OPS',
        id: '2'
    },
    {
        bil: 3,
        lokasi: 'MARITIM NEGERI KEDAH / PERLIS',
        namaVesel: 'PERKASA 28',
        jenisVesel: 'Bot',
        categoriAset: 'OPS',
        id: '3'
    },
    {
        bil: 4,
        lokasi: 'MARITIM NEGERI KEDAH / PERLIS',
        namaVesel: 'PETIR 81',
        jenisVesel: 'Bot',
        categoriAset: 'Non OPS',
        id: '4'
    },
])

const searchQuery = ref('')
</script>

<style lang="scss" scoped>

</style>