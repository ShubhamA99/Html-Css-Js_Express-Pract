{

   

   async function updateTable(root){
        root.querySelector(".table-refresh__button").classList.add(".table-refresh__button-refreshing");

        const table = root.querySelector(".table-refresh__table");
        const response = await fetch(root.dataset.url);
        const data  = await response.json();

        console.log(data);

        table.querySelector("thead tr").innerHTML="";
        table.querySelector("tbody").innerHTML="";


        for(const header of data.headers)
        {
            table.querySelector("thead tr").insertAdjacentHTML("beforeend",`<th>${header}</th>`)
        }

        for(const rows of data.rows)
        {
            table.querySelector("tbody ").insertAdjacentHTML("beforeend",`<tr>${rows.map(col =>`<td>${col}</td>`).join("")}</tr>`)
        }

        root.querySelector(".table-refresh__label").textContent = `last Update :${new Date(data.lastUpdated).toLocaleString()}`
    }

    for(const root of document.querySelectorAll(".table-refresh[data-url]")){
       const table= document.createElement("table");
       const options= document.createElement("div");

       table.classList.add("table-refresh__table");
       options.classList.add("table-refresh__options");

       table.innerHTML=`
        <thead>
        <tr></tr>
        </thead>
        <tbody>
        <tr>
        <td>....Loading</td>
        </tr>
        </tbody>
       `;

       options.innerHTML=`
       <span class="table-refresh__label" > Last Update :never</span>
            <button type="button" class="table-refresh__button table-refresh__button-refreshing" >
                <i class="material-icons">refresh</i>
            </button>`

       root.append(table,options)
       options.querySelector(".table-refresh__button").addEventListener("cdata-urllick" ,()=>{
        updateTable(root); 
       })
       updateTable(root);
    }
}