import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'
import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';

export default class App extends Component {
  pageSize = 5;
  API_KEY = process.env.REACT_APP_NEWS_API_KEY

  state = {
    progress : 0
  }

  setProgress=(progress)=>{
    this.setState({
      progress : progress
    })
  }
  render() {
    
    return (
      <Router>
      <div>
        <Navbar />
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
      />
        <Routes>
          <Route  exact  path="/business" element={<News setProgress  = {this.setProgress} api_key = {this.API_KEY} key="business"  country="in" pageSize={this.pageSize} category="business" />} />
          <Route  exact path="/entertainment" element={<News setProgress  = {this.setProgress} api_key = {this.API_KEY} key="entertainment" country="in" pageSize={this.pageSize} category="entertainment" />} />
          <Route exact path="/" element={<News setProgress  = {this.setProgress} api_key = {this.API_KEY}  key="general" country="in" pageSize={this.pageSize} category="general" />} />
          <Route  exact path="/health" element={<News setProgress  = {this.setProgress} api_key = {this.API_KEY} key="health" country="in" pageSize={this.pageSize} category="health" />} />
          <Route  exact path="/science" element={<News setProgress  = {this.setProgress} api_key = {this.API_KEY} key="science" country="in" pageSize={this.pageSize} category="science" />} />
          <Route  exact path="/sports" element={<News setProgress  = {this.setProgress} api_key = {this.API_KEY} key="sports" country="in" pageSize={this.pageSize} category="sports" />} />
          <Route exact path="/technology" element={<News setProgress  = {this.setProgress} api_key = {this.API_KEY} key="technology"  country="in" pageSize={this.pageSize} category="technology" />} />
        </Routes>
      </div>
    </Router>
    )
  }
}
