document.addEventListener('DOMContentLoaded', () => {
  const contentDiv = document.getElementById('content');
  const listDiv = document.getElementById('list');
  const descInput = document.getElementById('desc');
  const urgencyInput = document.getElementById('urgency');
  const createButton = document.getElementById('create');

  const displayMessage = (msg) => {
    contentDiv.textContent = msg;
  };

  const fetchTasks = async () => {
    try {
      const response = await fetch('/task');
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des tâches.');
      }
      const tasks = await response.json();
      listDiv.innerHTML = '';
      tasks.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.textContent = `Description: ${task.description}, Urgency: ${task.urgency}`;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Supprimer';
        deleteButton.addEventListener('click', async () => {
          try {
            await fetch(`/task/${task._id}`, { method: 'DELETE' });
            fetchTasks();
            displayMessage('Tâche supprimée avec succès.');
          } catch (err) {
            console.error(err);
            displayMessage('Erreur lors de la suppression de la tâche.');
          }
        });
        taskDiv.appendChild(deleteButton);
        listDiv.appendChild(taskDiv);
      });
    } catch (err) {
      console.error(err);
      displayMessage(err.message || 'Erreur lors de la récupération des tâches.');
    }
  };

  fetchTasks();

  createButton.addEventListener('click', async () => {
    const description = descInput.value.trim();
    const urgency = parseInt(urgencyInput.value);

    if (!description) {
      displayMessage('La description ne peut pas être vide.');
      return;
    }

    try {
      const response = await fetch('/task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description, urgency })
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la création de la tâche.');
      }
      const newTask = await response.json();
      displayMessage(`Nouvelle tâche créée avec l'id: ${newTask._id}`);
      fetchTasks();
    } catch (err) {
      console.error(err);
      displayMessage(err.message || 'Erreur lors de la création de la tâche.');
    }
  });
});

