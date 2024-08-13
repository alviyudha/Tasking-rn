import React, {useState} from 'react';
import {StyleSheet, Text, View, StatusBar, TextInput, TouchableOpacity, Modal, Pressable, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from '@react-native-community/checkbox';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [task, setTask] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [selectedTasks, setSelectedTasks] = useState({});

  const addTask = () => {
    if (taskText.trim()) {
      setTask([...task, {id: Date.now().toString(), text: taskText, isChecked: false}]);
      setTaskText('');
    }
  };

  const editTask = (id, newText) => {
    setTask(task.map(t => (t.id === id ? {...t, text: newText} : t)));
  };

  const deleteTasks = () => {
    setTask(task.filter(t => !selectedTasks[t.id]));
    setSelectedTasks({});
  };

  const toggleCheckBox = id => {
    setSelectedTasks({...selectedTasks, [id]: !selectedTasks[id]});
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor={'#330074'} />
      {/* header */}
      <View style={styles.viewHeader}>
        <Icon name={'notebook'} size={27} color={'white'} />
        <Text style={styles.textHeaderTitle}>Tasking App</Text>
      </View>

      {/* input tugas */}
      <View style={styles.viewInput}>
        <View style={styles.viewTextInput}>
          <TextInput
            placeholder="Buat Tugas"
            placeholderTextColor="gray"
            value={taskText}
            onChangeText={setTaskText}
            style={styles.inputText}
          />
        </View>
        <View style={{width: 30}} />
        <TouchableOpacity style={styles.btnAddTask} onPress={addTask}>
          <Icon name={'plus'} size={27} color={'white'} />
        </TouchableOpacity>
      </View>

      {/* render tugas */}
      {task.length === 0 && <Text style={{textAlign: 'center'}}>Tidak ada tugas</Text>}
      <FlatList
        data={task}
        renderItem={({item}) => (
          <View style={styles.viewTask}>
            <View style={styles.checkboxContainer}>
              <CheckBox
                value={selectedTasks[item.id] || false}
                onValueChange={() => toggleCheckBox(item.id)}
                style={styles.checkbox}
              />
            </View>
            <View style={styles.viewTaskContent}>
              <Text style={styles.taskTitle}>{item.text}</Text>
              <View style={styles.line} />
            </View>
            <TouchableOpacity
              style={{...styles.btnOption, backgroundColor: '#6600E7'}}
              onPress={() => {
                setTaskText(item.text);
                setModalVisible(true);
              }}>
              <Icon name={'pencil'} size={27} color={'white'} />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id}
      />

      {/* Tombol Hapus */}
      {Object.values(selectedTasks).some(isChecked => isChecked) && (
        <TouchableOpacity style={styles.btnDeleteTask} onPress={deleteTasks}>
          <Icon name={'delete'} size={27} color={'white'} />
          <Text style={{color: 'white', marginLeft: 5}}>Hapus</Text>
        </TouchableOpacity>
      )}

      {/* Modal untuk Edit Task */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.inputText}
              value={taskText}
              onChangeText={setTaskText}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                editTask(task.find(t => t.text === taskText).id, taskText);
                setModalVisible(!modalVisible);
                setTaskText('');
              }}>
              <Text style={styles.textStyle}>Simpan</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  viewHeader: {
    backgroundColor: '#330074',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  textHeaderTitle: {
    color: 'white',
    fontSize: 20,
    marginLeft: 10,
  },
  viewInput: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  viewTextInput: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  inputText: {
    color: 'black',
  },
  btnAddTask: {
    backgroundColor: '#6600E7',
    padding: 10,
    borderRadius: 5,
  },
  viewTask: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  viewTaskContent: {
    flex: 1,
    marginLeft: 10,
  },
  taskTitle: {
    fontSize: 16,
    color: 'black',
  },
  line: {
    height: 1,
    backgroundColor: 'lightgray',
    marginVertical: 5,
  },
  btnOption: {
    padding: 5,
    borderRadius: 5,
  },
  btnDeleteTask: {
    flexDirection: 'row',
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  checkboxContainer: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  checkbox: {
    width: 24,
    height: 24,
  },
});
