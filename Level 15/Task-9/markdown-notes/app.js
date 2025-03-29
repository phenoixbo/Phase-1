const fs = require('fs');
const path = require('path');
const marked = require('marked');
const inquirer = require('inquirer');
const notesDir = path.join(__dirname, 'notes');
if (!fs.existsSync(notesDir)) {
  fs.mkdirSync(notesDir);
}
async function createNote() {
  const answers = await inquirer.prompt([
    { name: 'title', message: 'Enter the title of the note:' },
    { name: 'content', message: 'Enter the content of the note (Markdown format):' },
  ]);

  const noteFilePath = path.join(notesDir, `${answers.title}.md`);
  fs.writeFileSync(noteFilePath, answers.content);

  console.log('Note created successfully!');
}
function listNotes() {
  const files = fs.readdirSync(notesDir);
  console.log('\nNotes:');
  files.forEach(file => {
    if (file.endsWith('.md')) {
      console.log(`- ${file.replace('.md', '')}`);
    }
  });
}
async function viewNote() {
  const answers = await inquirer.prompt([
    { name: 'title', message: 'Enter the title of the note to view:' },
  ]);

  const noteFilePath = path.join(notesDir, `${answers.title}.md`);

  if (fs.existsSync(noteFilePath)) {
    const content = fs.readFileSync(noteFilePath, 'utf-8');
    console.log('\nRendering Markdown content:\n');
    console.log(marked(content));
  } else {
    console.log('Note not found!');
  }
}
async function editNote() {
  const answers = await inquirer.prompt([
    { name: 'title', message: 'Enter the title of the note to edit:' },
    { name: 'newContent', message: 'Enter the new content (Markdown format):' },
  ]);

  const noteFilePath = path.join(notesDir, `${answers.title}.md`);

  if (fs.existsSync(noteFilePath)) {
    fs.writeFileSync(noteFilePath, answers.newContent);
    console.log('Note updated successfully!');
  } else {
    console.log('Note not found!');
  }
}
async function deleteNote() {
  const answers = await inquirer.prompt([
    { name: 'title', message: 'Enter the title of the note to delete:' },
  ]);

  const noteFilePath = path.join(notesDir, `${answers.title}.md`);

  if (fs.existsSync(noteFilePath)) {
    fs.unlinkSync(noteFilePath);
    console.log('Note deleted successfully!');
  } else {
    console.log('Note not found!');
  }
}
async function searchNotes() {
  const answers = await inquirer.prompt([
    { name: 'searchTerm', message: 'Enter a search term:' },
  ]);

  const files = fs.readdirSync(notesDir);
  let foundNotes = [];

  files.forEach(file => {
    if (file.endsWith('.md')) {
      const content = fs.readFileSync(path.join(notesDir, file), 'utf-8');
      if (content.includes(answers.searchTerm)) {
        foundNotes.push(file.replace('.md', ''));
      }
    }
  });

  if (foundNotes.length > 0) {
    console.log('Found notes containing the search term:');
    foundNotes.forEach(note => console.log(`- ${note}`));
  } else {
    console.log('No notes found containing the search term.');
  }
}
async function mainMenu() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'Create a new note',
        'List all notes',
        'View a specific note',
        'Edit an existing note',
        'Delete a note',
        'Search notes by content',
        'Exit',
      ],
    },
  ]);

  switch (answers.action) {
    case 'Create a new note':
      await createNote();
      break;
    case 'List all notes':
      listNotes();
      break;
    case 'View a specific note':
      await viewNote();
      break;
    case 'Edit an existing note':
      await editNote();
      break;
    case 'Delete a note':
      await deleteNote();
      break;
    case 'Search notes by content':
      await searchNotes();
      break;
    case 'Exit':
      console.log('Goodbye!');
      process.exit();
      break;
  }
  mainMenu();
}
mainMenu();
