<template>

 <div class="generalcontainer">
    <div class="generalcontainer centered">
        <div class="standardtext">
            Create a sitemap algorithm
        </div>
        <div class="smalltext">
            Once you created it, include it in the epiloge-server to be served to crawlers
        </div>
    </div>

    <div class="generalcontainer">
        <div class="button button-tag-mid inverted-green" @click="getAllCars()">Get all cars</div>
    </div>
    <div class="generalcontainer">
        <div class="button button-tag-mid inverted-green" @click="getAllBrands()">Get all brands</div>
    </div>
    <!-- 
    <div class="generalcontainer">
        <div class="button button-tag-mid inverted-green" @click="getAllEntities()">Get all organizations</div>
        {{entities.length}}
    </div> -->

    <div class="generalcontainer">
        <div class="button button-tag-mid inverted-green" @click="createSitemap()">Create sitemap</div>
    </div>
</div>


</template>

<script>
import { api } from "@/Api.js";

export default{
    name: 'Admin',  
    data(){
        return{
           
           cars: [],
           brands: []
/*            loadMoreUsers: true,
 */
           /* projects:[],
           loadMoreProjects: true,

           entities: [],
           loadMoreEntities: true */

        }
    },    
    computed: {
        
    },
            
    methods: {  
        
        //======= METHOD TO CREATE A SITEMAP FOR DYNAMIC CONTENT ==============
        createSitemap() {
            var doc = document.implementation.createDocument('', '', null);

            //create the outer tag
            var urlset = doc.createElement("urlset");
            urlset.setAttribute("xmlns", "http://www.sitemaps.org/schemas/sitemap/0.9");

            var url = ''; var changefreq = ''; var loc = '';
            var i;   
            //first create static sites (examples)
            var staticSites = ['om', 'kategori/el', 'kategori/miljo', '', 'bilar', 'marken'];
            for (i=0; i < staticSites.length; i++) {
                url = doc.createElement("url");
                loc = doc.createElement('loc');
                loc.innerHTML = 'https://xn--bilhjlpen-z2a.se/bil/' + staticSites[i];
                changefreq = doc.createElement("changefreq");
                changefreq.innerHTML = 'monthly';
                url.appendChild(loc);
                url.appendChild(changefreq);
                urlset.appendChild(url);
            }            

            //append dynamic user urls
            for (i=0; i < this.cars.length; i++) {
                url = doc.createElement("url");
                loc = doc.createElement('loc');
                console.log(this.cars[i].name)
                loc.innerHTML = 'https://xn--bilhjlpen-z2a.se/bil/' + this.cars[i].name;
                changefreq = doc.createElement("changefreq");
                changefreq.innerHTML = 'weekly';
                url.appendChild(loc);
                url.appendChild(changefreq);
                urlset.appendChild(url);
            }     
            //append dynamic articles/projects urls         
            /* for (i=0; i < this.projects.length; i++) {
                if (this.projects[i].status == 'published') {
                    url = doc.createElement("url");
                    loc = doc.createElement('loc');
                    loc.innerHTML = 'https://www.epiloge.com/' + this.projects[i].projecturl;
                    changefreq = doc.createElement("changefreq");
                    changefreq.innerHTML = 'weekly';
                    url.appendChild(loc);
                    url.appendChild(changefreq);
                    urlset.appendChild(url);
                }
            }  
             //append dynamic entities urls         
            for (i=0; i < this.entities.length; i++) {
                if (this.projects[i].orgname) {
                    url = doc.createElement("url");
                    loc = doc.createElement('loc');
                    loc.innerHTML = 'https://www.epiloge.com/org/' + this.entities[i].orgname;
                    changefreq = doc.createElement("changefreq");
                    changefreq.innerHTML = 'weekly';
                    url.appendChild(loc);
                    url.appendChild(changefreq);
                    urlset.appendChild(url);
                }
                
            }   */
            
            doc.appendChild(urlset);

            //serialize the xml file to txt
            var oSerializer = new XMLSerializer();
            var xmltext = oSerializer.serializeToString(doc);
            xmltext = '<?xml version="1.0" encoding="UTF-8"?>' + xmltext;

            //download the txt
            var pom = document.createElement('a');
            var filename = "sitemap.xml";
            pom = document.createElement('a');
            var bb = new Blob([xmltext], {type: 'text/plain'});
            pom.setAttribute('href', window.URL.createObjectURL(bb));
            pom.setAttribute('download', filename);
            pom.dataset.downloadurl = ['text/plain', pom.download, pom.href].join(':');
            pom.draggable = true; 
            pom.classList.add('dragout');
            pom.click();
         
            
        },
        
           //======== METHODS FOR USER CONTENT ========
        /* getAllProjects() {
            if (this.loadMoreProjects) {
                this.connectionProcessing = true;
                let uri = process.env.API_URL + 'admin/getallprojects/' + this.projects.length;
                this.axios.get(uri).then((response) => {                    
                    this.connectionProcessing = false;
                    var data = response.data;
                    if (data.success) {                      
                        this.projects = this.projects.concat(data.projects);
                        this.loadMoreProjects = data.loadMoreProjects;
                    } else {
                        this.$store.commit('setAlertMessage', data.message);         
                    }                    
                });  
            } else {
                this.$store.commit('setAlertMessage', 'All content loaded');  
            }
        },

         //======== METHOD FOR ALL ENTITIES ========
        getAllEntities() {
            if (this.loadMoreEntities) {
                this.connectionProcessing = true;
                let uri = process.env.API_URL + 'admin/getallentities/' + this.entities.length;
                this.axios.get(uri).then((response) => {                    
                    this.connectionProcessing = false;
                    var data = response.data;
                    if (data.success) {                      
                        this.entities = this.entities.concat(data.entities);
                        this.loadMoreEntities = data.loadMoreEntities;
                    } else {
                        this.$store.commit('setAlertMessage', data.message);         
                    }                    
                });  
            } else {
                this.$store.commit('setAlertMessage', 'All entities loaded');  
            }
        }, */

        //======== METHODS FOR USERS AND CATEGORIES ========
        getAllCars() {
            api
                .get("/models")
                .then((response) => {
                this.cars = response.data.models;
                })
                .catch((error) => {
                console.log(error);
                })
                .finally(() => this.loading = false)
        },
        
   }
}
</script>

Samlad info
Oberoende jämförelser
Personlig 