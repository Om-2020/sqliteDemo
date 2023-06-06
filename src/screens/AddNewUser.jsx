import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React,{useState,useNavigation,useEffect} from 'react'
import { openDatabase } from "react-native-sqlite-storage";
import { TextInput } from 'react-native-gesture-handler';

let db = openDatabase({ name: 'UserDatabase.db' });

const AddNewUser = ({navigation}) => {

  const [name,setname] = useState('');
  const [email,setemail] = useState('');
  const [address,setaddress] = useState('');

  //const navigation = useNavigation();

  const adduser = ()=>{
    navigation.navigate('User');
  };

  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_email INT(10), user_address VARCHAR(255))',
              []
            );
          }
        }
      );
    });
  }, []);


  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter user Name"
        style={styles.inputstyle}
        value={name}
        onChangeText={(text)=>{
          setname(text);
        }}
      />
      
      <TextInput
        placeholder="Enter user email"
        style={styles.inputstyle}
        value={email}
        onChangeText={(text) => {
          setemail(text);
        }}
      
      
      />

      <TextInput
        placeholder="Enter user address"
        style={styles.inputstyle}
        value={address}
        onChangeText={(text) => {
          setaddress(text);
        }}
      />

      <TouchableOpacity style={styles.btnstyle} onPress={adduser}>

        <Text style={styles.textstyle}>
          Save user
        </Text>

      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 0,

  },
  inputstyle: {
    width: '80%',
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "red",
    margin:10
  },
  btnstyle:{
    width:'60%',
    height:50,
    borderRadius:25,
    backgroundColor:'black',
    margin:10,
    justifyContent:'center',
    alignItems:'center'
  },
  textstyle:{
    alignSelf:'center',
    color:'white',
    fontSize:20,
    fontWeight:'500',
  },
});

export default AddNewUser;