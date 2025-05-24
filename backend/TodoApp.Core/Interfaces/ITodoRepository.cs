using TodoApp.Core.Entities;

namespace TodoApp.Core.Interfaces;

public interface ITodoRepository
{
    Task<IEnumerable<Todo>> GetAllAsync(string userId);
    Task<Todo?> GetByIdAsync(Guid id, string userId);
    Task<Todo> AddAsync(Todo todo);
    Task<Todo> UpdateAsync(Todo todo);
    Task DeleteAsync(Guid id, string userId);
    Task<IEnumerable<Todo>> GetByStatusAsync(string userId, bool isCompleted);
} 