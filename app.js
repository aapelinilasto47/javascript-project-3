// Tuodaan Vue-kirjasto
const { createApp } = Vue;

// Luodaan Vue-sovellus
createApp({
    data() {
        return {
            // valuuttamuunnoksen muuttujat
            amount: 1,
            fromCurrency: 'EUR',
            toCurrency: 'USD',
            result: null,
            currencies: ['EUR', 'USD', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'SEK'],
            exchangeRate: null,
            EURresult: null,
            exchangeRateEUR: null,
            fromRateEUR: null,
            sandels: 31.90,
            juhlaMokka: 9.45,
            fazerinSininen: 4.85
            
        };
    },
    // metodit valuuttamuunnokselle
    methods: {
        // haetaan valuuttakurssit ja suoritetaan muunnos
        async convertCurrency() {
            const url = `https://api.exchangerate-api.com/v4/latest/${this.fromCurrency}`;
            try {
                const response = await fetch(url);
                const data = await response.json();
                const rate = data.rates[this.toCurrency];
                this.result = (this.amount * rate).toFixed(2);
                this.exchangeRate = rate;
                
                
            } catch (error) {
                console.error('Error fetching exchange rates:', error);
                this.result = 'Error';
            }
            // haetaan EUR-kurssit erikseen, koska ne tarvitaan esimerkkituotteiden hintojen laskemiseen
            try {
                const responseEUR = await fetch(`https://api.exchangerate-api.com/v4/latest/EUR`);
                const dataEUR = await responseEUR.json();
                const rateEUR = dataEUR.rates[this.toCurrency];
                const fromRateEUR = dataEUR.rates[this.fromCurrency];
                this.fromRateEUR = fromRateEUR;
                
                this.EURresult = (this.amount * rateEUR).toFixed(2);
                this.exchangeRateEUR = rateEUR;
            } catch (error) {
                console.error('Error fetching EUR exchange rates:', error);
                this.EURresult = 'Error';
            }  
        },
        // valuuttojen vaihtaminen päittäin
        async switchCurrencies() {
            const temp = this.fromCurrency;
            this.fromCurrency = this.toCurrency;
            this.toCurrency = temp;
            await this.convertCurrency();
        }
    }
}).mount('#app');
// Sovellus kiinnitetään HTML-elementtiin, jonka id on "app"