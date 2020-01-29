let URL = "https://restcountries.eu/rest/v2/name/"
function getCountryName(){
    $('#submit_button').on("click", function(e){
        e.preventDefault()
        let countryName = $(".js-query").val()
        fetch(URL + countryName, {
            method: 'get',
        })
        .then( response => {
            if ( response.ok ){
                return response.json();
            }
            throw new Error ( response.statusText );
        })
        .then( responseJSON => {
            console.log(responseJSON)
            $("#results").append(
                `<p>${responseJSON[0].name}</p>
                 <p>${responseJSON[0].capital}</p>
                 <input type = "image" src = "${responseJSON[0].flag}">
                 <p>${responseJSON[0].population}</p>
                 <p>${responseJSON[0].region}</p>
                 <p>${responseJSON[0].timezones[0]}</p>
                 <p>${responseJSON[0].timezones[1]}</p>
                 <p>${responseJSON[0].timezones[2]}</p>
                 <p>${responseJSON[0].borders[0]}</p>
                 <p>${responseJSON[0].borders[1]}</p>
                 <p>${responseJSON[0].borders[2]}</p>`
            )
        })
        .catch( err => {
            console.log( err );
        });
        
    })
}

getCountryName()