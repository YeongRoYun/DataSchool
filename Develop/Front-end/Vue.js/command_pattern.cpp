#include <iostream>
#include <vector>
#include <string>

using namespace std;

//Command
class Command {
    public:
        virtual void execute(void) = 0;
        virtual ~Command(void) {};
};

//Receiver
class Ingredient: public Command {
    public:
        Ingredient(string amount, string ingredient) {
            _ingredient = ingredient;
            _amount = amount;
        }
        void execute(void) {
            cout << " *Add " << _amount << " of " << _ingredient << endl;
        }
    private:
        string _ingredient;
        string _amount;
};

//Receiver
class Step : public Command {
    public:
        Step(string action, string time) {
            _action = action;
            _time = time;
        }
        void execute(void) {
            cout<< " *" << _action << " for "<< _time <<endl;
        }
    private:
        string _action;
        string _time;
};

//Invoker
class Invoker {
    public:
        void add(Command *c) {
            commands.push_back(c);
        }
        void createRecipe(void) {
            for(vector<Command*>::size_type x = 0; x < commands.size(); ++x) {
                commands[x]->execute();
            }
        }

    private:
        vector<Command*> commands;
};

//Client
class Client {
    public:
        void add(Command *c) {
            commands.push_back(c);
        }
        void run() {
            for(auto& command: commands) {
                invoker.add(command);
            }
            invoker.createRecipe();
        }
    private:
        Invoker invoker;
        vector<Command*> commands;
};

int main(void) {
    Client client;

    //Create ingredients
    Ingredient first("2 tablespoons", "vegetable oil");
    Ingredient second("3 cups", "rice");
    Ingredient third("1 bottle", "Ketchup");
    Ingredient fourth("4 ounces", "peas");
    Ingredient fifth("1 teaspoon", "soy sauce");

    //Create Step
    Step step("Stir-fry", "3-4 minutes");

    //Create Recipe
    cout << "Recipe for simple Fried Rice" << endl;
    client.add(&first);
    client.add(&second);
    client.add(&third);
    client.add(&fourth);
    client.add(&fifth);
    client.add(&step);

    client.run();
    cout << "Enjoy!" << endl;
    return 0;
}