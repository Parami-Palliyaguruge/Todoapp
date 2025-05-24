using Moq;
using TodoApp.Core.DTOs;
using TodoApp.Core.Entities;
using TodoApp.Core.Interfaces;
using TodoApp.Core.Services;
using Xunit;

namespace TodoApp.Tests.Services;

public class TodoServiceTests
{
    private readonly Mock<ITodoRepository> _mockRepo;
    private readonly TodoService _service;
    private readonly string _testUserId = "test-user";

    public TodoServiceTests()
    {
        _mockRepo = new Mock<ITodoRepository>();
        _service = new TodoService(_mockRepo.Object);
    }

    [Fact]
    public async Task GetAllTodosAsync_ShouldReturnAllTodos()
    {
        // Arrange
        var expectedTodos = new List<Todo>
        {
            new() { Id = Guid.NewGuid(), Title = "Test1", UserId = _testUserId },
            new() { Id = Guid.NewGuid(), Title = "Test2", UserId = _testUserId }
        };

        _mockRepo.Setup(repo => repo.GetAllAsync(_testUserId))
            .ReturnsAsync(expectedTodos);

        // Act
        var result = await _service.GetAllTodosAsync(_testUserId);

        // Assert
        Assert.Equal(expectedTodos.Count, result.Count());
        _mockRepo.Verify(repo => repo.GetAllAsync(_testUserId), Times.Once);
    }

    [Fact]
    public async Task GetTodoByIdAsync_WithValidId_ShouldReturnTodo()
    {
        // Arrange
        var todoId = Guid.NewGuid();
        var expectedTodo = new Todo { Id = todoId, Title = "Test", UserId = _testUserId };

        _mockRepo.Setup(repo => repo.GetByIdAsync(todoId, _testUserId))
            .ReturnsAsync(expectedTodo);

        // Act
        var result = await _service.GetTodoByIdAsync(todoId, _testUserId);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(todoId, result.Id);
        _mockRepo.Verify(repo => repo.GetByIdAsync(todoId, _testUserId), Times.Once);
    }

    [Fact]
    public async Task CreateTodoAsync_ShouldCreateAndReturnTodo()
    {
        // Arrange
        var newTodo = new Todo { Title = "New Todo", UserId = _testUserId };

        _mockRepo.Setup(repo => repo.AddAsync(It.IsAny<Todo>()))
            .ReturnsAsync((Todo todo) => todo);

        // Act
        var result = await _service.CreateTodoAsync(newTodo);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(newTodo.Title, result.Title);
        Assert.NotEqual(default, result.CreatedAt);
        Assert.NotEqual(default, result.UpdatedAt);
        _mockRepo.Verify(repo => repo.AddAsync(It.IsAny<Todo>()), Times.Once);
    }

    [Fact]
    public async Task UpdateTodoAsync_WithValidData_ShouldUpdateAndReturnTodo()
    {
        // Arrange
        var todoId = Guid.NewGuid();
        var existingTodo = new Todo
        {
            Id = todoId,
            Title = "Original Title",
            Description = "Original Description",
            IsCompleted = false,
            UserId = _testUserId
        };

        var updateDto = new UpdateTodoDto
        {
            Title = "Updated Title",
            Description = "Updated Description",
            IsCompleted = true
        };

        _mockRepo.Setup(repo => repo.GetByIdAsync(todoId, _testUserId))
            .ReturnsAsync(existingTodo);
        _mockRepo.Setup(repo => repo.UpdateAsync(It.IsAny<Todo>()))
            .ReturnsAsync((Todo todo) => todo);

        // Act
        var result = await _service.UpdateTodoAsync(todoId, _testUserId, updateDto);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(updateDto.Title, result.Title);
        Assert.Equal(updateDto.Description, result.Description);
        Assert.Equal(updateDto.IsCompleted, result.IsCompleted);
        _mockRepo.Verify(repo => repo.UpdateAsync(It.IsAny<Todo>()), Times.Once);
    }

    [Fact]
    public async Task DeleteTodoAsync_WithValidId_ShouldDeleteTodo()
    {
        // Arrange
        var todoId = Guid.NewGuid();
        var existingTodo = new Todo { Id = todoId, Title = "Test", UserId = _testUserId };

        _mockRepo.Setup(repo => repo.GetByIdAsync(todoId, _testUserId))
            .ReturnsAsync(existingTodo);

        // Act
        await _service.DeleteTodoAsync(todoId, _testUserId);

        // Assert
        _mockRepo.Verify(repo => repo.DeleteAsync(todoId, _testUserId), Times.Once);
    }

    [Fact]
    public async Task GetTodosByStatusAsync_ShouldReturnFilteredTodos()
    {
        // Arrange
        var isCompleted = true;
        var expectedTodos = new List<Todo>
        {
            new() { Id = Guid.NewGuid(), Title = "Test1", IsCompleted = true, UserId = _testUserId },
            new() { Id = Guid.NewGuid(), Title = "Test2", IsCompleted = true, UserId = _testUserId }
        };

        _mockRepo.Setup(repo => repo.GetByStatusAsync(_testUserId, isCompleted))
            .ReturnsAsync(expectedTodos);

        // Act
        var result = await _service.GetTodosByStatusAsync(_testUserId, isCompleted);

        // Assert
        Assert.Equal(expectedTodos.Count, result.Count());
        Assert.All(result, todo => Assert.True(todo.IsCompleted));
        _mockRepo.Verify(repo => repo.GetByStatusAsync(_testUserId, isCompleted), Times.Once);
    }
} 