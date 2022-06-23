const API = "https://graph.facebook.com/";
const TOKEN = "EAAL6nAVNJTEBABMdURppi3pO7MuaeBbCZBxlRAtBQzPOBM1zGbgceozOXUaH2OyvMKUeqV4ZBmK6b43IdMrht21QnHWWbk7MeZAXpZBo5jkxfbPDvWd2SPypC5R0dshLZB4EMzpZBa8cKoZA28k9slbZAVkoYsKZB91q4EzXlxuH5wAZDZD";

const app = Vue.createApp({
    data() {
        return {
            busqueda: null,
            result: null,
            error: null,
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
            /*}finally {
                this.busqueda = null*/
            }
        }
    
}
})