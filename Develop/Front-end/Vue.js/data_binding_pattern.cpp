#include <iostream>
#include <string>
#include <vector>

using namespace std;

class Data {
    public:
        Data(string info) {
            _info = info;
        }
        void change(string info) {
            _info = info;
        }
    public:
        string _info;
};
bool operator==(const Data& lhs, const Data& rhs) {
    return lhs._info == rhs._info;
}
bool operator!=(const Data& lhs, const Data& rhs) {
    return !(lhs==rhs);
}

class User {
    public:
        void act(Data* data) {
            cout << "Current data is " << data->_info << endl; 
        }
};

class Observer {
    public:
        Observer(User* user, Data* data):_observedData(Data("")){
            _user = user;
            _data = data;
        }
        bool observe() {
            return *_data == _observedData;
        }
        void reflect() {
            _observedData = *_data;
            _user->act(&_observedData);
        }
    private:
        User* _user;
        Data* _data;
        Data _observedData;
};


int main(void) {
    User user;
    Data data("picture");
    Observer observer(&user, &data);
    
    size_t i = 0;
    observer.reflect();
    do {
        if(++i == 100) {
            data.change("video");
        }
    } while(observer.observe());

    observer.reflect();
    return 0;
}