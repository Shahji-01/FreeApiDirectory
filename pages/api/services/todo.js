// Custom Todo API - Simple todo list management API
// This is a stateful API that maintains todos in memory for the session

// In-memory store for todos (would be a database in production)
let todos = [
  {
    id: '1',
    title: 'Complete project documentation',
    completed: false,
    priority: 'high',
    dueDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    tags: ['work', 'documentation']
  },
  {
    id: '2',
    title: 'Buy groceries',
    completed: false,
    priority: 'medium',
    dueDate: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
    tags: ['personal', 'shopping']
  },
  {
    id: '3',
    title: 'Schedule team meeting',
    completed: true,
    priority: 'high',
    dueDate: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    tags: ['work', 'meetings']
  },
  {
    id: '4',
    title: 'Gym workout',
    completed: false,
    priority: 'low',
    dueDate: new Date(Date.now()).toISOString(), // Today
    tags: ['personal', 'health']
  },
  {
    id: '5',
    title: 'Review code pull requests',
    completed: false,
    priority: 'medium',
    dueDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    tags: ['work', 'coding']
  }
];

// Helper function to generate a new unique ID
const generateId = () => {
  const maxId = todos.length > 0 
    ? Math.max(...todos.map(t => parseInt(t.id)))
    : 0;
  return (maxId + 1).toString();
};

// Validate todo object
const validateTodo = (todo) => {
  if (!todo.title || todo.title.trim() === '') {
    throw new Error('Todo title is required');
  }
  
  if (todo.title.length > 100) {
    throw new Error('Todo title must be 100 characters or less');
  }
  
  if (todo.priority && !['low', 'medium', 'high'].includes(todo.priority)) {
    throw new Error('Priority must be low, medium, or high');
  }
  
  if (todo.dueDate) {
    const date = new Date(todo.dueDate);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid due date format');
    }
  }
  
  if (todo.tags && !Array.isArray(todo.tags)) {
    throw new Error('Tags must be an array');
  }
  
  if (todo.completed !== undefined && typeof todo.completed !== 'boolean') {
    throw new Error('Completed status must be a boolean');
  }
  
  return true;
};

// Parse the request body
const parseBody = async (req) => {
  try {
    if (typeof req.body === 'object' && req.body !== null) {
      return req.body;
    }
    
    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    const data = Buffer.concat(buffers).toString();
    
    if (data) {
      return JSON.parse(data);
    }
    
    return {};
  } catch (error) {
    console.error('Error parsing request body:', error);
    throw new Error('Invalid request body');
  }
};

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  try {
    const { id } = req.query;
    
    // GET all todos or a specific todo
    if (req.method === 'GET') {
      // Return a specific todo by ID
      if (id) {
        const todo = todos.find(t => t.id === id);
        
        if (!todo) {
          return res.status(404).json({ error: 'Todo not found' });
        }
        
        return res.status(200).json(todo);
      }
      
      // Filter by completion status
      const { completed, priority, tag } = req.query;
      
      let filteredTodos = [...todos];
      
      if (completed !== undefined) {
        const isCompleted = completed === 'true';
        filteredTodos = filteredTodos.filter(t => t.completed === isCompleted);
      }
      
      if (priority) {
        filteredTodos = filteredTodos.filter(t => t.priority === priority);
      }
      
      if (tag) {
        filteredTodos = filteredTodos.filter(t => 
          t.tags && t.tags.includes(tag)
        );
      }
      
      // Return all todos (possibly filtered)
      return res.status(200).json({
        count: filteredTodos.length,
        todos: filteredTodos
      });
    }
    
    // POST - Create a new todo
    if (req.method === 'POST') {
      const todoData = await parseBody(req);
      
      try {
        validateTodo(todoData);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
      
      const newTodo = {
        id: generateId(),
        title: todoData.title,
        completed: todoData.completed || false,
        priority: todoData.priority || 'medium',
        dueDate: todoData.dueDate || new Date().toISOString(),
        tags: todoData.tags || []
      };
      
      todos.push(newTodo);
      
      return res.status(201).json({
        message: 'Todo created successfully',
        todo: newTodo
      });
    }
    
    // PUT - Update a todo
    if (req.method === 'PUT') {
      if (!id) {
        return res.status(400).json({ error: 'Todo ID is required' });
      }
      
      const todoIndex = todos.findIndex(t => t.id === id);
      
      if (todoIndex === -1) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      
      const todoData = await parseBody(req);
      const existingTodo = todos[todoIndex];
      
      const updatedTodo = {
        ...existingTodo,
        ...todoData,
        id: existingTodo.id // Ensure ID doesn't change
      };
      
      try {
        validateTodo(updatedTodo);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
      
      todos[todoIndex] = updatedTodo;
      
      return res.status(200).json({
        message: 'Todo updated successfully',
        todo: updatedTodo
      });
    }
    
    // DELETE - Remove a todo
    if (req.method === 'DELETE') {
      if (!id) {
        return res.status(400).json({ error: 'Todo ID is required' });
      }
      
      const todoIndex = todos.findIndex(t => t.id === id);
      
      if (todoIndex === -1) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      
      // Remove the todo
      const deletedTodo = todos[todoIndex];
      todos = todos.filter(t => t.id !== id);
      
      return res.status(200).json({
        message: 'Todo deleted successfully',
        todo: deletedTodo
      });
    }
    
    // If we get here, the method is not supported
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error handling todo request:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}