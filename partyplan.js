const COHORT= "2309-FSA-ET-WEB-FT-SF";
const API_URL= `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2309-FSA-ET-WEB-FT-SF/events`;

const state ={
    party:[],
};

const partyList = document.querySelector("#party");

const addPartyForm = document.querySelector("#addParty");

//sync state with the API and rerender

async function render() {
    await getParty();
    console.log("state after getParty:", state)
    renderParty();
}
render();

//update state with artists from API ^^code above wont render anything, because we havent pulled this data from API link yet!
//it also wont work because we have to render our parties from state

async function getParty() {
    try{
        const response = await fetch(API_URL);
        const json = await response.json();
        state.party=json.data;
        console.log("party data:", state.party);

        }catch(error) {
            console.error(error)
        }
}
async function deleteParty(partyId) {
    console.log ("deleteing party with ID", party.id);
    try {
        const response= await fetch (`${API_URL}/${partyId}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error ("failed to delete the party")
        }
        renderParty();
    }catch (error) {
        console.error(error);
    }

}
function renderParty() {
    if (!state.party.length) {
        partyList.innerHTML=`<li>No Parties Found Loser! </li>`;
        return;
    }
    const partyCards=state.party.map((party) => {
        const li=document.createElement("li");
      
        // const partyDetails=document.createElement("div");
        // partyDetails.classList.add("party-details");
        li.innerHTML= `
        <h2> ${party.name}</h2>
        <p> ${party.description}</p>
        <p>${party.time}</p>
        <p>${party.location}</p>
        <p>${party.date}</p>
        `;
       const deleteButton = document.createElement("button");
       deleteButton.textContent = "Delete Party Loser";
       li.append(deleteButton);
       deleteButton.addEventListener("click", () => deleteParty(party._id));
       addPartyForm.addEventListener("submit", addParty);


        return li;
    });

    partyList.replaceChildren(...partyCards);
}

// @param {Event} event 

async function addParty(event) {
    event.preventDefault();

    try {
        console.log("adding party...");

        const response= await fetch (API_URL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
                body:JSON.stringify({
                    name:addPartyForm.elements.name.value,
                    description:addPartyForm.elements.description.value,
                    time:addPartyForm.elements.time.value,
                    location:addPartyForm.elements.location.value,
                    date:addPartyForm.elements.date.value,

                }),
        });
        console.log("response", response);

        if (!response.ok) {
            throw new Error("failed to create new party ... sorry");
        }
        addPartyForm.reset();

        render();
    } catch(error) {
        console.error(error);
    }
}

//  const formData=new FormData(addPartyForm);