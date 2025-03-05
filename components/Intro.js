function ExerciseIntro({ name }) {
  return (
    <div className="text-md text-zinc-600 mt-3">
      <p className="font-semibold text-2xl text-white">
        Welcome, {name}! Let's crush your fitness goals.
      </p>
      <p className="mt-2 text-white">
        Get a workout plan tailored to your strength, endurance, and overall
        fitness.{" "}
        <span className="font-bold">
          Stay consistent and keep pushing forward!
        </span>
      </p>
    </div>
  );
}

function DietIntro({ name }) {
  return (
    <div className="text-md text-zinc-600 mt-3">
      <p className="font-semibold text-2xl text-white">
        Welcome, {name}! Let's fuel your fitness journey.
      </p>
      <p className="mt-2 text-white">
        Get a personalized meal plan tailored to your goals—whether it's weight
        loss, muscle gain, or healthy eating.{" "}
        <span className="font-bold">Stay consistent and enjoy your meals!</span>
      </p>
    </div>
  );
}

export { DietIntro, ExerciseIntro };
