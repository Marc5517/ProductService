import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index"

interface IProduct {
    productId: number
    productNr: number
    customerNr: number
    invoiceNr: number
    serialNr: string
}

// use https (http secure).
// http (non secure) will make the app complain about mixed content when running the app from Azure
let baseUrl: string = "https://customerrestservice.azurewebsites.net/api/Products"

new Vue({
    // TypeScript compiler complains about Vue because the CDN link to Vue is in the html file.
    // Before the application runs this TypeScript file will be compiled into bundle.js
    // which is included at the bottom of the html file.
    el: "#app",
    data: {
        addData: { productNr: "", customerNr: "", invoiceNr: "", serialNr: ""},
        addMessage: "",
    },
    ///Når data fra en anden HTML-side bliver transporteret til dette program, så bliver kun det der nævnes nedenunder tilføjet til et felt på HTML-siden.
    created() {
        let params = new URLSearchParams(location.search);
        this.addData.customerNr = params.get('customerNr')
    },
    methods: {
        ///Skaber en vare til databasen
        addProduct() {
            axios.post<IProduct>(baseUrl, this.addData)
                .then((response: AxiosResponse) => {
                    
                    let message: string = "Skabningen af ny vare er " + response.statusText
                    this.addMessage = message
                })
                .catch((error: AxiosError) => {
                    // this.addMessage = error.message
                    alert(error.message)
                })
        }
    }
})