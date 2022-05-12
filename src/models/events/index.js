// //JS getter and setter is accessed like a property. Get event current bTime and eTime.

// //create abstrack class. Create extended classes for all the possible events

// //Create an newArray with all the new Event classes so we can call execute method for each event

// //Run newArray based of currentTime of the video

// // Dependency injection (might need to ask Grant)

// newArray.forEach(element => {
// 	if((currentTime >= element.start && currentTime <= element.end) && element.active === false){
// 		// execute event
// 	}
// 	else if (currentTime > element.end && element.active === true){
// 		//stop event
// 	}
// });

// // if (currentTime >= newArray[i].start && currentTime <= newArray[i].end) && newArray[i].active === false ---> execute ... this.active = true
// // else if currentTime > newArray[i].end && newArray[i].active === true ---> stop ... this.active = false

// blank and censor and comment

export default class Event {

	constructor(type, start, end) {
		this.type = type
		this.start = start
		this.end = end
		this.active = false
	}

	print(){
		console.log(`%c Executing event is: `, `color: blue; font-weight: bold; text-decoration: underline;`, this.type)
	}
}

export class SkipEvent extends Event {

}

export class MuteEvent extends Event {

}

export class PauseEvent extends Event {

}

export class CommentEvent extends Event {

	constructor(type, start, end, comment, position) {
		super(type, start, end)
		this.comment = comment
		this.position = position
	}
}

export class CensorEvent extends Event {

	constructor(type, start, end, position) {
		super(type, start, end)
		this.position = position
	}
}

export class BlankEvent extends Event {

}

// let modelArray = eventArray.map(event =>
// 	switch(event)
// 	{
// 		let obj;
// 		case event == "Comment":
// 		obj = new CommentEvent(obj.start, obj.end, obj.comment);
// 	}
// )

// // let commentEvent1 = new CommentEvent(s,c,comment);
// // commentEvent1.start

// // export default class Event {
// //   constructor(name, start, end) {
// //     this.name = name;
// //     this.start = start;
// // 		this.end = end;
// //   }

// // 	//methods

// // }