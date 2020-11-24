import React, { Component } from "react"; //imrc for shortcut using simple React snippets
//getMovies is a non component function
// import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
// import { getGenres } from "../services/fakeGenreService";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import MoviesTable from "./moviesTable";
import SearchBox from "./searchBox";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import _ from "lodash";

//cc for create class
class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedGenre: null,
    //sort column object This is passed to the handlesort method
    sortColumn: { path: "title", order: "asc" },
  };
  //this componenent will be called when an instance of this component is renedered in the DOM
  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];
    // this.setState({ movies: getMovies(), genres: getGenres() })
    // this.setState({ movies: getMovies(), genres: genres })
    //because the key and the value are the same you can just set it to "genres"
    const { data: movies } = await getMovies();
    // this.setState({ movies: getMovies(), genres: genres });
    this.setState({ movies, genres });
  }

  handleDelete = async (movie) => {
    // console.log(movie);
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    //set the movies property to the movies object;
    this.setState({ movies: movies });

    try {
      await deleteMovie(movie._id);
    }
    catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error('This movie has already been deleted');
        this.setState({movies: originalMovies });
    }


  };
  //This method just updates the view or the UI. We will have to update the backend database later
  handleLike = (movie) => {
    // console.log("Like Clicked", movie);
    //clone the state
    const movies = [...this.state.movies];
    //find index of cloned object
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    //toggle the liked and not liked state
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    //   console.log(genre);
    // this.setState({ selectedGenre: genre, currentPage: 1 });
    //you cannot use null or undefined when working with controlled components
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
    // console.log(path);
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn,
      searchQuery,
      movies: allMovies,
    } = this.state;
    //without destructing
    // const filtered =
    //   selectedGenre && selectedGenre._id
    //     ? this.state.movies.filter((m) => m.genre._id === selectedGenre._id)
    //     : this.state.movies;

    // const filtered =
    // selectedGenre && selectedGenre._id
    //   ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
    //   : allMovies;
    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);

    // const movies = paginate(allMovies, currentPage, pageSize);
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    //destructuring
    const { pageSize, currentPage, sortColumn } = this.state;
    //count here is the same thing as writing this.state.movies.length
    const { user } = this.props;
    // if (count === 0) return <p>There are no movies in the database.</p>;
    // In JavaScript, truthy are expressions which evaluates to boolean true value and falsy evaluates to boolean false value. Unlike other languages, true and false values are not limited to boolean data types and comparisons.
    const { totalCount, data: movies } = this.getPagedData();
    const { searchQuery } = this.state;
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            // textProperty="name"
            // valueProperty="_id"
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>

        <div className="col">
        {/* you have to be logged in for the add new button to appear */}
          {user &&<Link
            to="/movies/new"
            className="btn btn-primary"
            style={{ marginBotton: 20 }}
          >
            New Movie
          </Link>}
          <p>Showing {totalCount} movies in the database</p>
          {/* by moving the movies table to a separate component, all of the components in this file are at the same level of abstraction */}
        
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={count}
            // itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
