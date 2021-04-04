// deletes a meeting from the database


async function deleteFormHandler(event) {
  event.preventDefault();
// how is it figuring out the id of the post to delete?
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  const response = await fetch(`/api/posts/${id}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    document.location.replace('/dashboard/');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.delete-meeting').addEventListener('click', deleteMeetingHandler);
