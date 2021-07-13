import React, { Component } from 'react';
import './app.css';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../Item-add-form';


export default class App extends Component {

	maxId = 1

	createTodoItems(text) {
		return {
			label: text,
			important: false,
			done: false,
			id: this.maxId++
		}
	}

	state = {
		todoData: [
			this.createTodoItems('Learn JavaScript'),
			this.createTodoItems('Learn React'),
			this.createTodoItems('Learn Redux')
		],
		term: '',
		filter: 'done' //active, all, done
	}

	onDeletedItems = (id) => {
		this.setState(({ todoData }) => {
			const idx = todoData.findIndex((item) => item.id === id)
			const newTodoDate = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]
			return {
				todoData: newTodoDate,
			}
		})
	}

	onItemAdded = (text) => {

		const newPost = this.createTodoItems(text)
		this.setState(({ todoData }) => {
			return {
				todoData: [...todoData, newPost]
			}
		})
	}

	toggleProperty(arr, id, propName) {
		const idx = arr.findIndex((item) => item.id === id)
		const oldItem = arr[idx]
		const newItem = { ...oldItem, [propName]: !oldItem[propName] }
		return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
	}

	onToggleDone = (id) => {
		this.setState(({ todoData }) => {
			return {
				todoData: this.toggleProperty(todoData, id, 'done')
			}
		})
	}
	onToggleImportant = (id) => {
		this.setState(({ todoData }) => {
			return {
				todoData: this.toggleProperty(todoData, id, 'important')
			}
		})
	}

	searchItems(items, term) {
		if (term.length === 0) {
			return items
		}
		return items.filter(item => item.label.toLowerCase().indexOf(term.toLowerCase()) > -1)
	}

	onSearchItems = (term) => {
		this.setState({ term: term })
	}

	filter(items, filter) {
		switch (filter) {
			case 'all':
				return items
			case 'active':
				return items.filter((item) => !item.done)
			case 'done':
				return items.filter((item) => item.done)
			default:
				return items
		}
	}

	onFilterChange = (filter) => {
		this.setState({ filter })
	}

	render() {
		const { todoData, term, filter } = this.state

		const doneCount = todoData.filter(item => item.done).length
		const todosCount = todoData.length - doneCount
		const visibilityItems = this.filter(this.searchItems(todoData, term), filter)

		return (
			<div className="todo-app" >
				<AppHeader toDo={todosCount} done={doneCount} />
				<div className="top-panel d-flex">
					<SearchPanel onSearchItems={this.onSearchItems} />
					<ItemStatusFilter filter={filter} onFilterChange={this.onFilterChange} />
				</div>
				<TodoList
					todos={visibilityItems}
					onToggleDone={this.onToggleDone}
					onToggleImportant={this, this.onToggleImportant}
					onDeleted={this.onDeletedItems} />
				<ItemAddForm onAddedPost={this.onItemAdded} />
			</div>
		);
	}

};


