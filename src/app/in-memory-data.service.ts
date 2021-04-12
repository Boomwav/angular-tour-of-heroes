export class InMemoryDataService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Mr. Nice', scrollViewItems: [{url: 'https://picsum.photos/seed/MrNice1/100'},{url: 'https://picsum.photos/seed/MrNice2/100'},{url: 'https://picsum.photos/seed/MrNice3/100'}] },
      { id: 12, name: 'Narco', scrollViewItems: [{url: 'https://picsum.photos/seed/MrNice1/100'},{url: 'https://picsum.photos/seed/MrNice2/100'},{url: 'https://picsum.photos/seed/MrNice3/100'}]  },
      { id: 13, name: 'Bombasto', scrollViewItems: [{url: 'https://picsum.photos/seed/Bombasto1/100'},{url: 'https://picsum.photos/seed/Bombasto2/100'}] },
      { id: 14, name: 'Celeritas', scrollViewItems: [{url: 'https://picsum.photos/seed/Celeritas1/100'}]  },
      { id: 15, name: 'Magneta', scrollViewItems: [{url: 'https://picsum.photos/seed/Magneta1/300'}, {url: 'https://picsum.photos/seed/Magneta2/300'}, {url: 'https://picsum.photos/seed/Magneta3/300'}, {url: 'https://picsum.photos/seed/Magneta4/300'} ] },
      { id: 16, name: 'RubberMan', scrollViewItems: [] },
      { id: 17, name: 'Dynama', scrollViewItems: [] },
      { id: 18, name: 'Dr IQ', scrollViewItems: [] },
      { id: 19, name: 'Magma', scrollViewItems: [] },
      { id: 20, name: 'Tornado', scrollViewItems: [] }
    ];
    return { heroes };
  }
}
