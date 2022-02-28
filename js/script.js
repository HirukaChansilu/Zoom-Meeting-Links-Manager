// Variables and Objects

let links_object;

let add_btn = document.getElementsByClassName("add")[0];
let add_link_btn = document.getElementsByClassName("add-link-btn")[0];

let add_topic_input = document.getElementById("add-topic");
let add_link_input = document.getElementById("add-link");

let edit_topic_input = document.getElementById("edit-topic");
let edit_link_input = document.getElementById("edit-link");

let edit_btn = document.getElementsByClassName("edit");
let edit_link_btn = document.getElementsByClassName("edit-link-btn")[0];

let container = document.getElementsByClassName("container")[0];
let overlay = document.getElementsByClassName("overlay-popup");
let close_btns = document.getElementsByClassName("close-btn");

let card_to_edit;
let ignore_opening_link = false;

// Startup Conditions

if (
  localStorage.getItem("zoom_links_json") == null ||
  localStorage.getItem("zoom_links_json") == "{}"
) {
  links_object = {
    no_of_cards: 0,
    cards: {},
  };
} else {
  links_object = JSON.parse(localStorage.getItem("zoom_links_json"));
  refresh_container_with_cards();
}

// Functions

function update_local_stored_json() {
  localStorage.setItem("zoom_links_json", JSON.stringify(links_object));
}

function refresh_container_with_cards() {
  container.innerHTML = "";

  if (
    localStorage.getItem("zoom_links_json") != null &&
    localStorage.getItem("zoom_links_json") != "{}"
  ) {
    let add_btn_area_creating = document.createElement("div");
    add_btn_area_creating.setAttribute("class", "add-btn-filling");

    let add_btn_creating = document.createElement("div");
    add_btn_creating.setAttribute("class", "add hand");
    add_btn_creating.setAttribute("onclick", "open_add_overlay()");

    let add_btn_span = document.createElement("span");
    add_btn_span.setAttribute("class", "add-icon");
    add_btn_span.innerHTML = "+";

    add_btn_creating.appendChild(add_btn_span);
    add_btn_area_creating.appendChild(add_btn_creating);
    container.appendChild(add_btn_area_creating);

    for (let i = 1; i <= links_object["no_of_cards"]; i++) {
      if (Object.keys(links_object["cards"]).includes(String(i)) == true) {
        let meeting_card = document.createElement("div");
        meeting_card.setAttribute("class", "meeting-card hand");
        meeting_card.setAttribute("onclick", "open_link(" + String(i) + ")");

        let image = document.createElement("img");
        image.setAttribute("class", "zoom-logo");
        image.setAttribute("src", "./Assests/zoom_icon.svg");

        let h2 = document.createElement("h2");

        if (links_object["cards"][String(i)]["topic"].length <= 11) {
          h2.innerHTML = links_object["cards"][String(i)]["topic"];
        } else {
          h2.innerHTML =
            links_object["cards"][String(i)]["topic"].substring(0, 12) + "...";
        }

        let p = document.createElement("p");

        if (links_object["cards"][String(i)]["link"].length <= 20) {
          p.innerHTML = links_object["cards"][String(i)]["link"];
        } else {
          p.innerHTML =
            links_object["cards"][String(i)]["link"].substring(0, 21) + "...";
        }

        let text = document.createElement("div");
        text.appendChild(h2);
        text.appendChild(p);

        let edit_btn_local = document.createElement("img");
        edit_btn_local.setAttribute("class", "edit");
        edit_btn_local.setAttribute(
          "onclick",
          "open_edit_overlay(" + String(i) + ")"
        );
        edit_btn_local.setAttribute("src", "./Assests/edit_btn.svg");

        meeting_card.appendChild(image);
        meeting_card.appendChild(text);
        meeting_card.appendChild(edit_btn_local);
        container.appendChild(meeting_card);
      }
    }
  }
}

// Open overlays

function open_add_overlay() {
  overlay[0].style.display = "flex";
  add_topic_input.value = "";
  add_link_input.value = "";
}

function open_edit_overlay(index) {
  overlay[1].style.display = "flex";
  edit_topic_input.value = links_object["cards"][index]["topic"];
  edit_link_input.value = links_object["cards"][index]["link"];

  card_to_edit = index;
  console.log("Card to edit: " + card_to_edit);
  ignore_opening_link = true;
}

function open_delete_overlay() {
  overlay[2].style.display = "flex";
}

function open_reset_overlay() {
  overlay[3].style.display = "flex";
}

// Overlay Functions

function add_card() {
  if (
    (add_link_input.value.substring(0, 8) == "https://" ||
      add_link_input.value.substring(0, 7) == "http://") &&
    add_link_input.value.includes(".") == true
  ) {
    links_object["cards"][links_object["no_of_cards"] + 1] = {
      card_no: links_object["no_of_cards"] + 1,
      topic: add_topic_input.value,
      link: add_link_input.value,
    };

    links_object["no_of_cards"] += 1;

    console.log(links_object);

    close_overlay();
    update_local_stored_json();
    refresh_container_with_cards();
  } else {
    alert("Link is Not Valid.");
  }
}

function edit_link() {
  if (
    (edit_link_input.value.substring(0, 8) == "https://" ||
      edit_link_input.value.substring(0, 7) == "http://") &&
    edit_link_input.value.includes(".") == true
  ) {
    links_object["cards"][String(card_to_edit)]["topic"] =
      edit_topic_input.value;
    links_object["cards"][String(card_to_edit)]["link"] = edit_link_input.value;
    close_overlay();
    update_local_stored_json();
    refresh_container_with_cards();
  } else {
    alert("Link is Not Valid.");
  }
}

function delete_link() {
  console.log("Card to edit: " + card_to_edit);
  delete links_object["cards"][String(card_to_edit)];
  close_overlay();
  update_local_stored_json();
  refresh_container_with_cards();
}

function reset() {
  console.log("reset");
  localStorage.clear();
  links_object = {
    no_of_cards: 0,
    cards: {},
  };
  close_overlay();
  update_local_stored_json();
  refresh_container_with_cards();
}

function close_overlay() {
  for (let i = 0; i < overlay.length; i++) {
    overlay[i].style.display = "none";
  }
}

// Card Functions

function open_link(no) {
  if (ignore_opening_link == true) {
    ignore_opening_link = false;
  } else {
    if (
      (links_object["cards"][String(no)]["link"].substring(0, 8) ==
        "https://" ||
        links_object["cards"][String(no)]["link"].substring(0, 7) ==
          "http://") &&
      links_object["cards"][String(no)]["link"].includes(".") == true
    ) {
      window.open(links_object["cards"][String(no)]["link"]);
    }
  }
}
