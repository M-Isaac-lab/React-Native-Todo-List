import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, Text, StatusBar, TextInput, Button, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ItemProps = {
    id: string,
    text : string,
    done : boolean,
};


export default function To_do_list() {

    const [tasksfilter,  setTasksfilter] = useState('');
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState<ItemProps[]>([]);

    useEffect(() => {
        AsyncStorage.getItem('TASKS').then((data) => {
            if (data) setTasks(JSON.parse(data));
        });
    }, []);

    useEffect(() => {
        AsyncStorage.setItem('TASKS', JSON.stringify(tasks));
    }, [tasks]);

    const toggleDone = (id:string) => {
        const newTasks = tasks.map(t =>
            t.id === id ? { ...t, done: !t.done } : t
        );
        setTasks(newTasks);
    };

    const deleteTask = (id:string) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    const Item = ({id, text, done}: ItemProps) => (
        <View style={styles.item}>
            <TouchableOpacity  onPress={()=>toggleDone(id)}>
                <Text style={done ? styles.title : styles.title_not_do}>{id}</Text>
                <Text style={done ? styles.title : styles.title_not_do}>{text}</Text>
            </TouchableOpacity>
            <Button title={'Supprimer'} onPress={()=>deleteTask(id)}/>

        </View>
    );


    const addTask = async () => {
        if (task.trim() !== '') {
            setTasks([...tasks, { id: Date.now().toString(), text: task, done: false }]);
            setTask('');
            await addTaskInLocalStorage()

        }
    };

    const addTaskInLocalStorage = async () => {
        await localStorage.setItem('TASKS', JSON.stringify(tasks));

    }



    return (
        <View style={styles.container}>

            <FlatList
                data={tasks}
                renderItem={({item}) => <Item text={item.text}  done={item.done} id={item.id}/>}
                keyExtractor={item => item.id}
            />
            <View style={styles.save}>
            <TextInput
                style={styles.input}
                onChangeText={setTask}
                value={task}
            />
            <Button onPress={addTask} title="Enregistrer" />
            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    save : {
        marginVertical : 30
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
    title_not_do : {
        fontSize: 32,
        textDecorationLine: 'line-through',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    button: {

    },
});

