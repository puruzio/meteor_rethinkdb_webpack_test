import { Component } from 'react';
import { Link } from 'react-router';
import ReactMixin from 'react-mixin';
import ReactMeteorData from 'react-meteor-data';

import TodoHeader from './components/TodoHeader';
import TodoList from './components/TodoList';

import Tasks from 'TodoApp/collections/Tasks';
import Cities from 'TodoApp/collections/Cities';
import accounting from 'TodoApp/scripts/accounting.min';


@ReactMixin.decorate(ReactMeteorData)
export default class TodoMain extends Component {

state = {
    hideCompleted: false
  }

  getMeteorData() {
    Meteor.subscribe('tasks');

    let taskFilter = {};

    if (this.state.hideCompleted) {
      taskFilter.checked = {$ne: true};

      Meteor.subscribe('data');

      r = Rethink.r;

    }

    const tasks = Tasks.find(taskFilter, {sort: {createdAt: -1}}).fetch();
    const incompleteCount = Tasks.find({checked: {$ne: true}}).count();

    return {
      tasks,
      incompleteCount,
      user: Meteor.user(),
      cities: Cities.run(),
      //cities_sorted: Cities.orderBy({index:'population'}).run(),
      cities_sorted: _.sortBy(Cities.fetch(), 'population').reverse(),
      cities_china: Cities.filter({country:'Korea'}).run()
    };
  }

  data_add_button() {
    Cities.insert({name: "Testcity", country: "Bermuda", population: 30000}).run();
  }

  handleToggleHideCompleted = (e) => {
    this.setState({ hideCompleted: e.target.checked });
  }

  render() {
    if (!this.data.tasks) {
      // loading
      return null;
    }

    console.log(this.data);
    var city_list = this.data.cities.map(function(city) {
      return (
          <li key={city.id}>
            {accounting.formatNumber(city.population)} .... {city.name}, {city.country}
          </li>
      );
    });
    var city_sort = this.data.cities_sorted.map(function(city) {
      return (
          <li key={city.id}>
            {accounting.formatNumber(city.population)} .... {city.name}, {city.country}
          </li>
      );
    });
    var city_china = this.data.cities_china.map(function(city) {
      return (
          <li key={city.id}>
            {accounting.formatNumber(city.population)} .... {city.name}, {city.country}
          </li>
      );
    });

    return (
        <div className="container">
          <Link to="/admin">Admin</Link>

          <div className="my-custom-class-for-grid">
            <div className="my-custom-class-for-grid-cell">
              All:
              {city_list}
            </div>
             <div className="my-custom-class-for-grid-cell">
              By population:
              {city_sort}
            </div>
            <div className="my-custom-class-for-grid-cell">
              In Korea:
              {city_china}
              <button onClick={this.data_add_button}>Press me </button>
            </div>

          </div>


        </div>
    );
  }
};
 /*
 <TodoHeader
 incompleteCount={this.data.incompleteCount}
 hideCompleted={this.state.hideCompleted}
 toggleHideCompleted={this.handleToggleHideCompleted}
 />
 <TodoList tasks={this.data.tasks} />
 */