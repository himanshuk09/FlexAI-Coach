export default function CustomSelect({ label, id, values, value, onChange }) {
  return (
    <>
      <label
        htmlFor={id}
        className="block text-sm  leading-6 font-bold text-white"
      >
        {label}
      </label>
      <div className="mt-2">
        <select
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          className="block w-full rounded-md border-0 py-2 px-2 font-light shadow-sm ring-1 ring-inset ring-black/15 focus:ring-1 focus:ring-inset focus:ring-black/15 sm:max-w-xs sm:text-sm sm:leading-6 outline-black/15"
        >
          {values.map(({ value, title }) => (
            <option key={value} value={value}>
              {title}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
