import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, Text, StatusBar, TextInput, Button, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ItemProps = {
    id: number,
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

    const toggleDone = (id:number) => {
        const newTasks = tasks.map(t =>
            t.id === id ? { ...t, done: !t.done } : t
        );
        setTasks(newTasks);
    };

    const deleteTask = (id:number) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    const Item = ({id, text, done}: ItemProps) => (
        <View style={styles.item}>
            <TouchableOpacity style={styles.taskInfo} onPress={() => toggleDone(id)}>
                <Text style={styles.date}>
                    {new Date(Number(id)).toLocaleString('fr-FR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </Text>
                <Text style={styles.taskId}>ID: #{id}</Text>
                <Text style={done ? styles.taskTextDone : styles.taskText}>{text}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteTask(id)}>
                <Text style={styles.deleteText}>🗑 Supprimer</Text>
            </TouchableOpacity>
        </View>


    );


    const addTask = async () => {
        if (task.trim() !== '') {
            setTasks([...tasks, { id: Date.now(), text: task, done: false }]);
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
                data={tasks} // ← pense à afficher les tâches filtrées si tu utilises le filtre
                renderItem={({ item }) => (
                    <Item text={item.text} done={item.done} id={item.id} />
                )}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.listContent}
            />

            <View style={styles.saveSection}>
                <TextInput
                    style={styles.input}
                    placeholder="Ajouter une nouvelle tâche..."
                    placeholderTextColor="#aaa"
                    onChangeText={setTask}
                    value={task}
                />
                <TouchableOpacity style={styles.saveButton} onPress={addTask}>
                    <Text style={styles.saveButtonText}>💾 Enregistrer</Text>
                </TouchableOpacity>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    taskInfo: {
        flex: 1,
        paddingRight: 10,
    },

    date: {
        fontSize: 13,
        color: '#888',
        fontStyle: 'italic',
        marginBottom: 4,
    },

    taskId: {
        fontSize: 12,
        color: '#aaa',
        marginBottom: 4,
    },

    taskText: {
        fontSize: 18,
        color: '#333',
        fontWeight: '500',
    },

    taskTextDone: {
        fontSize: 18,
        color: '#999',
        textDecorationLine: 'line-through',
        fontStyle: 'italic',
    },

    deleteButton: {
        backgroundColor: '#ffefef',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },

    deleteText: {
        color: '#cc0000',
        fontWeight: '600',
        fontSize: 14,
    },
    container: {
        flex: 1,
        backgroundColor: '#f4f4f8',
        paddingTop: StatusBar.currentHeight || 40,
        paddingHorizontal: 16,
    },

    listContent: {
        paddingBottom: 80, // laisse de la place sous la liste
    },

    saveSection: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        flexDirection: 'row',
        alignItems: 'center',
    },

    input: {
        flex: 1,
        height: 48,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        marginRight: 8,
        fontSize: 16,
        backgroundColor: '#fff',
    },

    saveButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
    },

    saveButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    save : {
        marginVertical : 30
    },
    title: {
        fontSize: 32,
    },
    title_not_do : {
        fontSize: 32,
        textDecorationLine: 'line-through',
    },
    button: {

    },


});

