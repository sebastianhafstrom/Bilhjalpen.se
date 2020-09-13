<template>
    <v-container>
    <v-row>
        <v-col class="text-left" cols="12">
            <h1 class="display-1 font-weight-thin mb-4">Om Bilhjälpen.se</h1>
            <p>På Bilhjälpen.se vill vi hjälpa vanliga konsumenter göra bättre bilköp. Genom att erbjuda möjligheten att i lugn och ro kunna göra oberoende jämförelser mellan mängder av olika bilmärken, modeller och varianter så kan konsumneten hitta de bilar som passar just den. Även om man inte är intresserade av långa rader av specifikation så kan kan Bilhjälpen.se hälpa just dig. Vi erbjuder ett verktyg där du beskriver dina begov och din livssituation. Vi rekommenderar bilar beroende på dina svar och ser till att du får en variation av bilar att välja mellan.</p>
            <v-btn color="primary" class=" white--text mt-8" to="/" tile>Tillbaka till startsidan</v-btn>
        </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: "About",
    metaInfo: {
        title: 'Om Bilhjälpen.se',
        meta: [
            {vmid: 'description', name: 'description', content: 'Vi på Bilhjälen låter dig i lugn och ro göra egna undersökningar om vilken bil som passar dig. Slipp säljare som tjatar och maffiga annonser.'}
        ],
        link: [
            { rel: 'canonical', href: 'om'}
        ]
    }
}
</script>

<style>

</style>