using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TodoApp.Core.DTOs;
using TodoApp.Core.Entities;
using TodoApp.Core.Services;

namespace TodoApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
// [Authorize]
public class TodosController : ControllerBase
{
    private readonly TodoService _todoService;

    public TodosController(TodoService todoService)
    {
        _todoService = todoService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Todo>>> GetAll()
    {
        var userId = "test-user"; // Temporary user ID for testing
        var todos = await _todoService.GetAllTodosAsync(userId);
        return Ok(todos);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Todo>> GetById(Guid id)
    {
        var userId = "test-user"; // Temporary user ID for testing
        var todo = await _todoService.GetTodoByIdAsync(id, userId);
        if (todo == null)
        {
            return NotFound();
        }
        return Ok(todo);
    }

    [HttpPost]
    public async Task<ActionResult<Todo>> Create(Todo todo)
    {
        todo.UserId = "test-user"; // Temporary user ID for testing
        var createdTodo = await _todoService.CreateTodoAsync(todo);
        return CreatedAtAction(nameof(GetById), new { id = createdTodo.Id }, createdTodo);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Todo>> Update(Guid id, UpdateTodoDto updateDto)
    {
        try
        {
            var updatedTodo = await _todoService.UpdateTodoAsync(id, "test-user", updateDto);
            return Ok(updatedTodo);
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        try
        {
            await _todoService.DeleteTodoAsync(id, "test-user"); // Temporary user ID for testing
            return NoContent();
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }
    }

    [HttpGet("status/{isCompleted}")]
    public async Task<ActionResult<IEnumerable<Todo>>> GetByStatus(bool isCompleted)
    {
        var userId = "test-user"; // Temporary user ID for testing
        var todos = await _todoService.GetTodosByStatusAsync(userId, isCompleted);
        return Ok(todos);
    }
} 