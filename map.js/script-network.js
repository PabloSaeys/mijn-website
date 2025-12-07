// functie om willekeurige items te krijgen uit een array
function getRandomItems(array, numItems) {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numItems);
}


fetch('./json/networkconfig.json')
    .then(function (response) {
        // nakijken of de API-call een antwoord terugstuurt
        if (response.ok) {
            // als de status "ok" (=200) is, dan wordt het antwoord omgezet in JSON
            return response.json();
        } else {
            // als de status niet "ok" is, geef dan de status terug en annuleer het uitvoeren
            return Promise.reject(response.status);
        }
    })


    .then(function (response) {
        // lees het volledige antwoord uit in de console
        console.log(response);

        // krijg willekeurige devices uit het JSON-bestand
        const randomNetworkDevices = getRandomItems(response.network_devices, 6);

        // plaats een section met grid
        let html = '<div class="accordion accordion-flush" id="accordionExample">';

        // plaats van de gebruikers met afbeelding, naam,...in HTML
        randomNetworkDevices.forEach((networkDevice, i) => {
            html += `<div class="accordion-item">

            <h2 class="accordion-header">
                <button class="accordion-button collapsed text-lowercase fs-6 fw-bolder pt-2" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${i}" aria-expanded="false" aria-controls="collapse${i}">
                ${networkDevice.name}
                </button>
              </h2>

              <div id="collapse${i}" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
              <div class="accordion-body">
                <div class="row justify-content-start">
                    <div class="col col-md-4 col-lg-4">
                        <img src="${networkDevice.image}" class="img-thumbnail float-start" alt="${networkDevice.name}">
                    </div>
                    <div class="col col-md-8 col-lg-8>
                        <span class="h6 mt-2">naam</span>: ${networkDevice.name}<br>
                        <span class="h6 mt-2">type</span>: ${networkDevice.type} van "${networkDevice.brand}"<br>
                        <span class="h6 mt-2">status</span>: ${networkDevice.status}
                    </div>        
                </div>
                <br>${networkDevice.description}<hr>
                <span class="h6 mt-2">locatie</span>: ${networkDevice.location.address} <br>
                <span class="h6 mt-2">ip</span>: ${networkDevice.ip_address}
                </div>
            </div>
      </div>`;
        });
        html += '</div>';
        document.getElementById("networkDevicesAccordion").innerHTML = html;
    })

    .catch(function (error) {
        // indien er een fout is, toon in de console dan wat er misloopt
        console.error("Error with message: " + error)
    });