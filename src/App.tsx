import "./styles.css";
const data = {
  notes: [
    {
      point: `Create an Application class and annotate it with @HiltAndroidApp. This
    creates a component that’s attached to the Apps lifecycle and it acts
    as dependencies container and provides the deps to the App and its
    children components.`
    },
    {
      point: `Activities, Fragment, View, Service, BroadcastReceiver are annotated with @AndroidEntryPoint. Hilt generates a container/component for each one with the annotated classes, and provides deps to them.`
    }
  ]
};

type CardProps = {
  point: string;
};

export default function App() {
  const Card = (props: CardProps) => {
    const { point } = props;
    return (
      <div className="Card w-80 rounded flex-none dark:bg-slate-800 m-4 p-8 first:ml-4 last:mr-4">
        <p className="text text-slate-400 text-left text-base font-body leading-relaxed">
          {point}
        </p>
      </div>
    );
  };

  return (
    <div className="App bg-white">
      <h1 className="topic text text-slate-300 text-left text-4xl font-body leading-tight">
        Dependency Injection
      </h1>
      <div className="relative rounded-xl overflow-auto">
        <div className="max-w-md mx-auto  shadow-xl min-w-0 p-10">
          <div className="overflow-x-auto flex">
            {data.notes.map((note) => (
              <Card point={note.point} />
            ))}
          </div>
        </div>
      </div>
      {/* <div classNameName="absolute inset-0 pointer-events-none border border-black/5 rounded-xl dark:border-white/5"></div> */}
      {/* <div classNameName="cards-container bg-red-300 flex flex-row flex-nowrap overflow-auto">
        <div classNameName="w-56 h-56 bg-red-400 mx-8"></div>
        <div classNameName="w-56 h-56 bg-red-400 mx-8"></div> */}

      {/* <div classNameName="Card p-8">
          <p classNameName="text">
            Create an Application className and annotate it with @HiltAndroidApp.
            This creates a component that’s attached to the Apps lifecycle and
            it acts as dependencies container and provides the deps to the App
            and its children components.
          </p>
        </div>
        <div classNameName="Card">
          <p classNameName="text">
            Create an Application className and annotate it with @HiltAndroidApp.
            This creates a component that’s attached to the Apps lifecycle and
            it acts as dependencies container and provides the deps to the App
            and its children components.
          </p>
        </div> */}
      {/* </div> */}
    </div>
  );
}
