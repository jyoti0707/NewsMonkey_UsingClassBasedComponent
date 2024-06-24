import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    constructor(){
        super();
        this.state = {
            articles : [],
            loading : false,
            page : 1,
            nextDisable : false,
            totalResults : 0
        }
    }

    static defaultProps = {
        country : "in",
        pageSize : 5,
    }

    static propTypes = {
        country : PropTypes.string,
        pageSize: PropTypes.number,
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    async update() {
        this.props.setProgress(10)
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.api_key}&page=1&pageSize=${this.props.pageSize}`
        this.setState({loading:true})
        let data = await fetch(url)
        this.props.setProgress(30)
        let parsedData = await data.json()
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading:false
        })
        this.props.setProgress(100)
    }

    fetchMoreData = async() => {
        this.setState({
            page: this.state.page + 1
        })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.api_key}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        let data = await fetch(url)
        let parsedData = await data.json()
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
        })

      }

    async componentDidMount(){
        this.update()
    }

     handleNextClick= async() =>{
        this.setState({
            page : this.state.page + 1
        })
        this.update()
        
    }

     handlePrevClick= async()=>{
        this.setState({
            page : this.state.page - 1
        })
        this.update()
    }
  render() {
    return (
      <div className="container my-3">
         
        <h1 className='text-center'>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines </h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}
        >
            
        <div className="row ">
            { this.state.articles.map((element)=>{
                return <div className="col-md-4 my-2" id={element.url}>
                <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} url = {element.url} date = {element.publishedAt} author = {element.author} source = {element.source.name} />
                </div>
            })} </div>

        
        {/* <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark " onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled={this.state.page==Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
        
        </InfiniteScroll>
      </div>
    )
  }
}

export default News
