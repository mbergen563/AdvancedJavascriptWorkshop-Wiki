function toggleModuleEditMode(element) {
  container = element.parentElement.parentElement;
  title = container.children[0].children[0];
  content = container.children[1];

  if (container.classList.toggle("editmode")) {
    element.innerHTML = "submit";

    setEditMode(title, true);
    setEditMode(content, true);
  } else {
    element.innerHTML = "edit";

    setEditMode(title, false);
    setEditMode(content, false);

    moduleIndex = +container.id.substring(2);

    updateModuleWithHTTP(moduleIndex, title.innerHTML, content.innerHTML);
  }
}

function updateModuleWithHTTP(moduleIndex, updatedName, updatedContent) {
  fetch(`${window.location.href}/update_module`, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json;charset=utf-8",
    }),
    body: JSON.stringify({
      index: moduleIndex,
      name: updatedName,
      content: updatedContent,
    }),
  }).then((response) => {
    console.log(response);
  });
}

function setEditMode(element, canEdit) {
  if (canEdit) {
    element.classList.add("editing");
    element.contentEditable = "true";
  } else {
    element.classList.remove("editing");
    element.contentEditable = "false";
  }
}
