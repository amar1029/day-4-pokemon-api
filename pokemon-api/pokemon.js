const pokemonInputElement = document.getElementById('pokeName');
const searchBtn = document.getElementById('searchBtn');
document.getElementById('alert').style.display = "none";

searchBtn.addEventListener('click', async (e) => {
    const pokeName = pokemonInputElement.value;
    const url = 'https://pokeapi.co/api/v2/pokemon/' + pokeName + '/';
    try {
        const response = await fetch(url);
        const pokeData = await response.json();
        console.log(pokeData);
        

        const pokeName = pokeData.name[0].toUpperCase() + pokeData.name.slice(1);
        const pokeId = pokeData.id;
        const pokeHeight = (pokeData.height / 3.048).toFixed(1);
        const pokeWeight = (pokeData.weight / 4.5359237).toFixed(1);
        const baseExperience = pokeData.base_experience;
        
        const pokeType = pokeData.types.map(key => key.type.name)[0].toUpperCase();
        const pokeAbilities = pokeData.abilities.map(key => key.ability.name)[0].toUpperCase();
        const pokeForms = pokeData.forms.map(key => key.name)[0].toUpperCase();

        displayPokeProfile(pokeName, pokeId, pokeHeight, pokeWeight, baseExperience, pokeType, pokeAbilities, pokeForms)
        document.getElementById('alert').style.display = "none";


    }   catch (err) {
            console.log('Pokemon Not Found');
            clearFinder();

        }

    })

function displayPokeProfile(pokeName, pokeId, pokeHeight, pokeWeight, baseExperience, pokeType, pokeAbilities, pokeForms) {
    document.getElementById('pokeProfile').innerHTML = `
    <div class="card card-body mb-3">
        <div class="row">
            <div class="col-md-3">
                <img src="https://pokeres.bastionbot.org/images/pokemon/${pokeId}.png" class="img-fluid mb-2"/>
                    <h3 class="text-center"><span class="badge badge-pill badge-warning" style="color: black"><strong>${pokeName}</strong></span></h3>
            </div>
            <div class="col-md-9">
                <span class="badge badge-secondary">ID: #${pokeId}</span>
                <span class="badge badge-secondary">Height: ${pokeHeight} ft</span>
                <span class="badge badge-secondary">Weight: ${pokeWeight} lbs</span>
                <span class="badge badge-secondary">Base Experience: ${baseExperience}</span>
                <br><br>
                <ul class="list-group mt-5">
                    <li class="list-group-item">Type: ${pokeType}</li>
                    <li class="list-group-item">Abilities: ${pokeAbilities}</li>
                    <li class="list-group-item">Forms: ${pokeForms}</li>
                </ul>
        </div>
    </div>
        `;}

function clearFinder() {
    pokemonInputElement.value = '';
    document.getElementById('pokeProfile').innerHTML = ``
    document.getElementById('alert').style.display = "block";
}