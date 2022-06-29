const API = "https://graph.facebook.com/";
const TOKEN = "EAAL6nAVNJTEBABMdURppi3pO7MuaeBbCZBxlRAtBQzPOBM1zGbgceozOXUaH2OyvMKUeqV4ZBmK6b43IdMrht21QnHWWbk7MeZAXpZBo5jkxfbPDvWd2SPypC5R0dshLZB4EMzpZBa8cKoZA28k9slbZAVkoYsKZB91q4EzXlxuH5wAZDZD";

const app = Vue.createApp({
    data() {
        return {
            busqueda: null,
            result: null,
            error: null,
            favoritos: new Map()
        }
    },

    created(){
        const FavoritoGuardados = JSON.parse(window.localStorage.getItem("misFavoritos"))

        if(FavoritoGuardados?.length){

            const FavoritosRebuild = new Map(

                FavoritoGuardados.map(alias=>[alias.id,alias])
            )
            this.favoritos = FavoritosRebuild
        }
    },

    computed:{

        estadoFavorito(){
            return this.favoritos.has(this.result.id)
        },

        todosFavorito(){
            //pasamos la información a un array
            return Array.from(this.favoritos.values())
            //el metodo values()traera solo los valores sin las claves
        }
    },

    methods: {

        //la palabra funciont no es necesaria, porque se usa un metodo
        async Buscar(){
            //depende del error
            this.result = this.error = null
            try {
                const response = await fetch(API + this.busqueda + "?fields=id,name,email,picture&access_token=" + TOKEN)
                if(!response.ok) throw new Error("Usuario no Encontrado")
                //ahora quiero traer la info en formato json
                const data = await response.json()
                console.log(data)
                this.result = data //cambiar true por data

            } catch (error) {
                this.error = error  
                //tan pronto como termine el proceso limpia haciendo vacia la busqueda  
            }finally {
                this.busqueda = null
            }
        },//aqui cierra el metodo buscar
        
        addFavorito(){
            this.favoritos.set(this.result.id, this.result)
            this.actualizarStorage()
        },

        removerFavorito(){
            this.favoritos.delete(this.result.id)
            this.actualizarStorage()
        },

        actualizarStorage(){
            window.localStorage.setItem('misFavoritos', JSON.stringify(this.todosFavorito))
        },

        mostrarFavorito(parametro){
            //tipo array con objetos de javascript
            this.result = parametro
        }
    }
})
