let myLeads = [];
const inputEL = document.querySelector("#input-el");
const saveBtn = document.querySelector("#save-btn");
const deleteBtn = document.querySelector("#delete-btn");
const ulEl = document.querySelector("#ul-el");
const tabBtn = document.querySelector("#tab-btn");
let leadsFromlocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromlocalStorage) {
  myLeads = leadsFromlocalStorage;
  render(myLeads);
}

saveBtn.addEventListener("click", function () {
  myLeads.push(inputEL.value);
  inputEL.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
});

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `<li><a href='
      ${leads[i]}' 
      target='_blank'> 
      ${leads[i]} 
      </a></li>`;
  }
  ulEl.innerHTML = listItems;
}
