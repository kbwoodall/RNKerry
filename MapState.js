/* map State */

//import { connect } from 'react-redux'

const mapStateToProps = state => {
    return {
        places: state.places.places
    }
}
const mapDispatchToProps = dispatch => {
    return {
        add: (name => {
            dispatch(addPlace(name))
        })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)