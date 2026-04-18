function searchPage(event) {
   event.preventDefault() ; // stops page jump when using search button
  const query = document.getElementById("searchInput").value.toLowerCase();

  // Remove old highlights
  document.querySelectorAll("mark").forEach(mark => {
    const parent = mark.parentNode;
    parent.replaceChild(document.createTextNode(mark.textContent), mark);
    parent.normalize();
  });

  if (!query) return;

  let found = false;

  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  let node;
  while ((node = walker.nextNode())) {
    const text = node.nodeValue.toLowerCase();

    if (text.includes(query)) {
      const span = document.createElement("span");
      const regex = new RegExp(`(${query})`, "gi");

      span.innerHTML = node.nodeValue.replace(regex, "<mark>$1</mark>");

      node.parentNode.replaceChild(span, node);

      if (!found) {
        span.scrollIntoView({ behavior: "smooth", block: "center" });
        found = true;
      }
    }
  }

  if (!found) {
    alert("No matches found");
  }
}