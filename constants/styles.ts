import { StyleSheet } from 'react-native';
import COLORS from './Colors';


var styles = StyleSheet.create({
  whiteTextBold: {
    color: "white",
    fontWeight: 500,
    fontSize: 15
  },
  whiteText: {
    color: "white"
  },
  input: {
    height: 40,
    borderColor: 'gray',
    color: "black",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    width: "80%",
  },
  scrollview: {
    width: "100%"
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: "center"
  },
  header: {
    color: "white",
    fontFamily: "Regular"
  },
  leftAligned: {
    width: "90%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: 20,
  },
  rightAligned: {
    width: "90%",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginBottom: 20,
    marginTop: 20
  },
  centerAligned: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  }
});


export default styles;
