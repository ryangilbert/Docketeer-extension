import React, { useState, useEffect } from 'react';
import styles from './Metrics.module.scss';

const Snapshots = (): JSX.Element => {

  //added states for comparing snapshots
  // const [snapshotLeft, updateSnapshotLeft] = useState<JSX.Element[]>([]);
  // const [snapshotRight, updateSnapshotRight] = useState<JSX.Element[]>([]);
  const [dropDown, updateDropDown] = useState<JSX.Element[]>([]);
  const [dateLeft, updateDateLeft] = useState('');
  const [dateRight, updateDateRight] = useState('');

  const getDates = () : void => {
    fetch('http://localhost:3000/api/saveMetricsEntry/date')
      .then((data) => data.json())
      .then((data) => {
        populateDropdown(data)
      })
      .catch((err) => console.log(err));
  }
  
  const populateDropdown = (dates: []): void => {
    const newDropDown: JSX.Element[] = [];
    dates.forEach((dateObj: any) => {
      const date: string = dateObj.metric_date
    newDropDown.push(
        <option id="date-select" value={date}>
          {date}
        </option>
      )
      console.log('date added to dropDown list:', date)
      console.log('length of dropdown list:', dropDown.length)
    });
    updateDropDown(newDropDown);
  }

  const retrieveSnapshot = (dropDownSide:string) => {
    const valueSelected: any = document.querySelector(`#select-${dropDownSide}`);
    const optionValue = valueSelected ? valueSelected.value : null;
    if (dropDownSide === 'left') {
      updateDateLeft(optionValue)
    }
    else if (dropDownSide === 'right') {
      updateDateRight(optionValue)
    }
    console.log('valueSelected', optionValue);

    // getSnapshotDB(optionValue, dropDownSide);
  }

  // const getSnapshotDB = (date, dropDownSide:string) => {
  //   fetch(`http://localhost:3000/api/saveMetricsEntry/snapshot/${date}`)
  //     .then((data) => data.json())
  //     .then((data) => {
  //       console.log(data)
  //       displaySnapshot(data, dropDownSide);
  //     })
  //     .catch((err) => console.log(err));
  // }
  
  // const displaySnapshot = (metrics, dropDownSide) => {
  //   const dataArray: JSX.Element[] = [];
  //   for (const key in metrics) {
  //     dataArray.push(
  //       <label>
  //         <p>
  //           {key}: {metrics[key]}
  //         </p>
  //       </label>
  //     );
  //   }
  //   if (dropDownSide === 'left') {
  //     updateSnapshotLeft(dataArray);
  //   }
  //   else if (dropDownSide === 'right'){
  //     updateSnapshotRight(dataArray);
  //   }
  // }

  useEffect(() => {
      getDates();
  },[])

  let iframeLinkLeft = `http://localhost:49155/d/a5ae5af6-d66f-48be-bc88-08dee3060f86/snapshot-test?orgId=1&var-metric_date=${dateLeft}&from=1699282966816&to=1699304566817&kiosk`;
  let iframeLinkRight = `http://localhost:49155/d/a5ae5af6-d66f-48be-bc88-08dee3060f86/snapshot-test?orgId=1&var-metric_date=${dateRight}&from=1699282966816&to=1699304566817&kiosk`

  return (
    <div className={styles.snapshotWrapper}>
      <div>
        <label>
          <strong>CHOOSE A DATE:</strong>
        </label>
        <select id="select-left">{dropDown}</select>

        <button
          className={styles.button}
          onClick={() => retrieveSnapshot("left")}
        >
          RETRIEVE SNAPSHOT
        </button>
        {/* <div className={styles.snapshotContent}>{snapshotLeft}</div> */}
        <div className={styles.snapshotContent}>
          <iframe
            className={styles.metrics}
            src={iframeLinkLeft}
          />
        </div>
      </div>
      <div>
        <label>
          <strong>CHOOSE A DATE:</strong>
        </label>
        <select id="select-right">{dropDown}</select>

        <button
          className={styles.button}
          onClick={() => retrieveSnapshot("right")}
        >
          RETRIEVE SNAPSHOT
        </button>
        {/* <div className={styles.snapshotContent}>{snapshotRight}</div> */}
        <div className={styles.snapshotContent}>
          <iframe
            className={styles.metrics}
            src={iframeLinkRight}
          />
        </div>
      
      </div>
    </div>
  );
};

export default Snapshots;
