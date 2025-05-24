using TodoApp.Core.DTOs;
using TodoApp.Core.Entities;
using TodoApp.Core.Interfaces;

namespace TodoApp.Core.Services;

public class TodoService
{
    private readonly ITodoRepository _todoRepository;

    public TodoService(ITodoRepository todoRepository)
    {
        _todoRepository = todoRepository;
    }

    public async Task<IEnumerable<Todo>> GetAllTodosAsync(string userId)
    {
        return await _todoRepository.GetAllAsync(userId);
    }

    public async Task<Todo?> GetTodoByIdAsync(Guid id, string userId)
    {
        return await _todoRepository.GetByIdAsync(id, userId);
    }

    public async Task<Todo> CreateTodoAsync(Todo todo)
    {
        todo.CreatedAt = DateTime.UtcNow;
        todo.UpdatedAt = DateTime.UtcNow;
        return await _todoRepository.AddAsync(todo);
    }

    public async Task<Todo> UpdateTodoAsync(Guid id, string userId, UpdateTodoDto updateDto)
    {
        var existingTodo = await _todoRepository.GetByIdAsync(id, userId);
        if (existingTodo == null)
        {
            throw new KeyNotFoundException($"Todo with ID {id} not found.");
        }

        // Update only the provided fields
        if (updateDto.Title != null)
            existingTodo.Title = updateDto.Title;
        if (updateDto.Description != null)
            existingTodo.Description = updateDto.Description;
        if (updateDto.IsCompleted.HasValue)
            existingTodo.IsCompleted = updateDto.IsCompleted.Value;

        existingTodo.UpdatedAt = DateTime.UtcNow;
        return await _todoRepository.UpdateAsync(existingTodo);
    }

    public async Task DeleteTodoAsync(Guid id, string userId)
    {
        var todo = await _todoRepository.GetByIdAsync(id, userId);
        if (todo == null)
        {
            throw new KeyNotFoundException($"Todo with ID {id} not found.");
        }

        await _todoRepository.DeleteAsync(id, userId);
    }

    public async Task<IEnumerable<Todo>> GetTodosByStatusAsync(string userId, bool isCompleted)
    {
        return await _todoRepository.GetByStatusAsync(userId, isCompleted);
    }
} 